import { Component } from '@angular/core';
import { ServerError } from '../../components';
import { ShowcaseService } from '../showcase.service';

@Component({
  templateUrl: './server-error-showcase.component.html',
  styleUrls: ['../showcase.component.scss'],
  selector: 'showcase-server-error'
})
export class ServerErrorShowcaseComponent {
  httpErrorData = {
    url: 'http://walhalla.et',
    parameterName: 'Name',
    parameterValue: 'Tarantino'
  };

  httpResponse = {
    errorCode: 0,
    messageShort: '-',
    messageLong: '-'
  };

  constructor(
    private scs: ShowcaseService
  ) { }

  demoHttpError(): void {
    this.scs.checkError(
      this.httpErrorData.url,
      this.httpErrorData.parameterName,
      this.httpErrorData.parameterValue
    ).subscribe(responseData => {
      if (responseData instanceof ServerError) {
        this.httpResponse.errorCode = (responseData as ServerError).code;
        this.httpResponse.messageShort = (responseData as ServerError).labelNice;
        this.httpResponse.messageLong = (responseData as ServerError).labelSystem;
      } else {
        this.httpResponse.errorCode = 0;
        this.httpResponse.messageShort = 'valid serverresponse';
        this.httpResponse.messageLong = (responseData as string);
      }
    });
  }
}
