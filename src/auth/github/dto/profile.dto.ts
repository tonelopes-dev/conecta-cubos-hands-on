class Email {
  value: string;
  // Outras propriedades do objeto email, se necessário
}

export class ProfileDTO {
  id?: string;
  github_id?: string;
  displayName: string;
  access_token: string;
  emails: Email[];
  bar_code: string;
}
