export type RecipientConfig = {
  yourEmail: string;
  herEmail: string;
  yesNotifiedAt: string | null;
};

export const DEFAULT_RECIPIENTS: RecipientConfig = {
  yourEmail: "",
  herEmail: "",
  yesNotifiedAt: null,
};
