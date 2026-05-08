export type DomainEventMap = {
  'user.registered': {
    userId: string;
    email: string;
    name: string;
  };
  'family.created': {
    familyId: string;
    createdById: string;
  };
  'event.created': {
    eventId: string;
    familyId: string;
    createdById: string;
  };
  'reminder.created': {
    reminderId: string;
    familyId: string;
    dueAt: Date;
  };
  'suggestion.voted': {
    suggestionId: string;
    familyId: string;
    userId: string;
  };
  'wish.created': {
    wishId: string;
    familyId: string;
    createdById: string;
  };
};

export type DomainEventName = keyof DomainEventMap;
