import { Component } from '@angular/core';
import{Configuration, OpenAIApi} from 'openai';
import { environment } from 'src/environments/environment';
import { ChatWithBot, ResponseModel } from '../models/gpt-response';
import { gptModels } from '../models/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

 chatConversation: ChatWithBot[]=[];
response!: ResponseModel | undefined;
    gptModels = gptModels
    promptText = '';
    showSpinner = false;

    topic!: string;
    task!: string;


  constructor(private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  checkResponse() {
    this.pushChatContent(this.promptText,'You','person');
    this.invokeGPT();
  }

  submit(){
    if(this.topic!=null || this.task!==null){
      const finalPromt = "Wrtie a Prompt about " + this.topic + " For a " + this.task;
    this.promptText = finalPromt;
    this.pushChatContent(this.promptText,'You','person');
    this.invokeGPT();
    }
    

  }


  pushChatContent(content:string, person:string, cssClass:string) {
    const chatToPush: ChatWithBot = { person:person, response:content, cssClass:cssClass};
    this.chatConversation.push(chatToPush);
  }


  getText(data:string) {
    return data.split('\n').filter(f=>f.length>0);
  }

  async invokeGPT() {
   

    if(this.promptText.length<2)
    return;

    

    try{
      this.response = undefined;
      let configuration = new Configuration({apiKey: environment.apiKey});
      let openai = new OpenAIApi(configuration);

      let requestData={
        model: 'text-davinci-003',//'text-davinci-003',//"text-curie-001",
        prompt: this.promptText,//this.generatePrompt(animal),
        temperature: 0.95,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      this.showSpinner = true;
      let apiResponse =  await openai.createCompletion(requestData);

      this.response = apiResponse.data as ResponseModel;
      this.pushChatContent(this.response.choices[0].text.trim(),'Prompt Bot','bot');
debugger;
      this.showSpinner = false;
    }catch(error:any) {
      this.showSpinner = false;
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        
      }
    }
  }

  

}
