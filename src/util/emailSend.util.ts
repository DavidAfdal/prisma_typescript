import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({});

export function sendMail(subject: string, messgae: string, from: string, to: string): Promise<any> {
  return transpoter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
}
