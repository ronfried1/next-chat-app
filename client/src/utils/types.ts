/**
 * User
 */

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}
export interface CreateUsernameVariables {
  username: string;
}
export interface SearchUsersInput {
  username: string;
}

export interface SearchedUser {
  id: string;
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

declare global {
  interface Window {
    my_modal_1: any;
    ConversationModal: React.ReactElement;
  }
}

/**
 * Conversations  
 */

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantIds: string[];
}
