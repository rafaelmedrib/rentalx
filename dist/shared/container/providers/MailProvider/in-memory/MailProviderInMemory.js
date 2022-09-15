"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailProviderInMemory = void 0;

/* eslint-disable @typescript-eslint/no-explicit-any */
class MailProviderInMemory {
  constructor() {
    this.messages = [];
  }

  async sendMail(to, subject, variables, path) {
    this.messages.push({
      to,
      subject,
      variables,
      path
    });
  }

}

exports.MailProviderInMemory = MailProviderInMemory;