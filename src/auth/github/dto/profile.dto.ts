class Email {
  value: string;
  // Outras propriedades do objeto email, se necessário
}

export class ProfileDTO {
  id?: string;
  displayName: string;
  emails: Email[];
  bar_code: string;
}
