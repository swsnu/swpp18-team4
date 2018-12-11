import { Injectable } from '@angular/core';

import * as Talk from 'talkjs';
import { Deferred } from 'src/app/core/models/deffered.util';
import { UserService } from './user.service';
import { User } from 'src/app/core/models/user';
import { TypeEnum } from '../models/enums/type-enum.enum';

@Injectable({
  providedIn: 'root'
})
export class TalkService {
  private static APP_ID = 'toOPLc3M';
  private currentTalkUser: Talk.User;
  private loadedPopups: Talk.Popup[];
  private currentSessionDeferred = new Deferred<Talk.Session>();

  constructor(private userService: UserService) { 
    this.loadedPopups = [];
  }

  async createCurrentSession() {
    await Talk.ready;

    const currentUser = this.userService.getCurrentUser();
    const currentTalkUser = await this.createTalkUser(currentUser);

    const session = new Talk.Session({
        appId: TalkService.APP_ID,
        me: currentTalkUser
    });
    this.currentTalkUser = currentTalkUser;
    this.currentSessionDeferred.resolve(session);
  }

  async createTalkUser(applicationUser: User) : Promise<Talk.User> {
    await Talk.ready;

    return new Talk.User({
        id: 'snutada_i_love_talkjs_' + applicationUser.id,
        name: applicationUser.nickname,
        email: applicationUser.email,
        // photoUrl: applicationUser.profile_image,
        configuration: (applicationUser.user_type === TypeEnum.EE ? "employee" : "employer"),
        welcomeMessage: "안녕하세요, 궁금한 점 있으신가요?"
     });
  }

  async createPopup(otherApplicationUser: User, keepOpen: boolean) : Promise<Talk.Popup> {
    const session = await this.currentSessionDeferred.promise;
    const conversationBuilder = await this.getOrCreateConversation(session, otherApplicationUser);
    const popup = session.createPopup(conversationBuilder, { keepOpen: keepOpen });

    this.loadedPopups.push(popup);
    return popup;
  }

  async createChatbox(otherApplicationUser: User) : Promise<Talk.Chatbox> {
    const session = await this.currentSessionDeferred.promise;
    const conversationBuilder = await this.getOrCreateConversation(session, otherApplicationUser);

    return session.createChatbox(conversationBuilder);
  }

  destroyAllLoadedPopups() {
    if (this.loadedPopups.length > 0) {
      this.loadedPopups.forEach(p => p.destroy());
      this.loadedPopups = [];
    }
  }

  private async getOrCreateConversation(session: Talk.Session, otherApplicationUser: User) {
    const otherTalkUser = await this.createTalkUser(otherApplicationUser);
    
    const conversationBuilder = session.getOrCreateConversation(Talk.oneOnOneId(this.currentTalkUser, otherTalkUser));
    conversationBuilder.setParticipant(this.currentTalkUser);
    conversationBuilder.setParticipant(otherTalkUser);

    return conversationBuilder;
  }
}
