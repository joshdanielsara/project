function wrapRomanticEmail(title: string, paragraphs: string[]) {
  const body = paragraphs
    .map(
      (text) =>
        `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#5c3a45;">${text}</p>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#fff5f7;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 16px 40px rgba(244,63,106,0.12);">
            <tr>
              <td style="height:8px;background:linear-gradient(90deg,#fb7189,#f43f6a);"></td>
            </tr>
            <tr>
              <td style="padding:36px 32px 40px;text-align:center;">
                <div style="font-size:28px;margin-bottom:12px;">❤️</div>
                <h1 style="margin:0 0 20px;font-size:26px;line-height:1.3;color:#5c3a45;">${title}</h1>
                <div style="text-align:left;">${body}</div>
                <p style="margin:28px 0 0;font-size:13px;color:#8a6570;">With love · Our Little Story</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function yourYesEmailHtml() {
  return wrapRomanticEmail("She Said YES! ❤️", [
    "She said YES! ❤️",
    "It's official! She agreed to let you court her and take this next step together.",
    "Here's to more memories, meaningful moments, and a new chapter together.",
  ]);
}

export function herYesEmailHtml() {
  return wrapRomanticEmail("A Little Something to Remember ❤️", [
    "Thank you for saying YES! ❤️",
    "I'm really happy that we're taking this next step together. I look forward to making more memories with you, getting to know you even better, and making every moment count.",
    "Here's to us and everything ahead!",
  ]);
}
