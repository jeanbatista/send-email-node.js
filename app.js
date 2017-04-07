var nodemailer = require('nodemailer');

// Configurações do transporte de email
var transporte = nodemailer.createTransport({
  service: 'Nome do serviço',
  auth: {
    user: 'email',
    pass: 'senha'
  } 
});

// Configurações default dos e-mails.
var config = {
  remetente: 'remetente',
  assunto: 'Envio de email'
};

// Lista de e-mails para envio.
var usuarios = [
  {
    nome: 'nome destinatário',
    sobrenome: 'sobrenome destinatário',
    email: 'email do destinatário'
  },
  {
      nome: 'segundo nome destinatário',
      sobrenome: 'segundo sobrenome destinatário',
      email: 'segundo email do destinatário'
  }
];

/**
 * Função recursiva para enviar todos os e-mails
 */
function enviar(i){
    // Recupera usuário.
  var usuario = usuarios[i];

  // Verifica se array de usuários é válido.
  if(!usuario)

  // Enviar email com as configurações pré definidas.
  transporte.sendMail({
    from: config.remetente,
    to: usuario.email,
    subject: config.assunto,
    html: '<img src=cid:img-mail />',
    attachments: [{
        filename: 'teste.jpg',
        path: 'caminho-da-imagem',
        cid: "igm-mail"
    }]
  }, function(err){

    if(err)
      // Mensagem de exceção
      throw err;
    
    // Feedback do envio de e-mail.
    console.log('E-mail para %s enviado!', usuario.email);

    // Incremento para recuperação do próximo usuário da fila.
    enviar(++i);
  });
};

/**
 * Realizar chamada da função.
 */
enviar(0);