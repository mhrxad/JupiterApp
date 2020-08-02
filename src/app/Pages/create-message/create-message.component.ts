import {Component, OnInit} from '@angular/core';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  htmlText = '';
  config = {};

  constructor() {
  }

  ngOnInit(): void {
    this.config = {
      syntax: true,
      imageResize: true,
      ImageResize: {},
      toolbar: []

    };


  }

  activateRTL(editor) {
    editor.format('align', 'right');
    editor.format('direction', 'rtl');
    editor.format('font', 'Vazir');
  }



}
