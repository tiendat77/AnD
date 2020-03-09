import { Component, OnInit } from '@angular/core';

import * as aesjs from 'aes-js';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.page.html',
  styleUrls: ['./tool.page.scss'],
})
export class ToolPage implements OnInit {

  secretKey = 'thesecretkey1234';

  encryptedHex = '';

  constructor() { }

  ngOnInit() {
  }

  do() {
    this.encrypt();

    this.decrypt();
  }

  encrypt() {
    const key = new TextEncoder().encode(this.secretKey);

    // Convert text to bytes
    const text = 'Text may be any length you wish, no padding is required.';
    const textBytes = aesjs.utils.utf8.toBytes(text);

    // The counter is optional, and if omitted will begin at 1
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    this.encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(this.encryptedHex);
    // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
    //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"
  }

  decrypt() {
    const key = new TextEncoder().encode(this.secretKey);

    // When ready to decrypt the hex string, convert it back to bytes
    const encryptedBytes = aesjs.utils.hex.toBytes(this.encryptedHex);

    // The counter mode of operation maintains internal state, so to
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    // decrypt a new instance must be instantiated.
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Convert our bytes back into text
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);
    // "Text may be any length you wish, no padding is required."
  }

}
