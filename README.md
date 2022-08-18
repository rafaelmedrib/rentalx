# Cadastro de carro

**RF**
- Deve ser possível cadastrar um novo carro.

**RN**
- Não deve ser possível cadastrar um novo carro com uma placa já existente.
- O carro deve ser cadastrado como disponível como padrão.
- O usuário responsável pelo cadastro deve possuir privilégios de administrador. (Isso não é responsabilidade do CreateCarUseCase)

# Listagem de carros

**RF**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome (modelo).
- Deve ser possível listar todos os carros disponíveis pelo marca.
- Deve ser possível listar todos os carros disponíveis pelo categoria.

**RN**
- Deve ser possível realizar a listagem sem estar logado no sistema.

# Cadastro de especificação do carro

**RF**
- Deve ser possível cadastrar uma nova especificação para o carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**RN**
- O usuário responsável pelo cadastro deve possuir privilégios de administrador.
- Não deve ser possível duplicar uma especificação para um mesmo carro.
- Não deve ser possível cadastrar uma especificação para um carro inexistente.

# Cadastro de imagens do carro

**RF**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**RNF**
- Utilizar o multer para o upload dos arquivos.

**RN**
- O usuário responsável pelo cadastro deve possuir privilégios de administrador.
- Deve ser possível cadastrar mais de uma imagem por carro.

# Aluguel

**RF**
- Deve ser possível cadastrar um aluguel.

**RN**
- Não deve ser possível cadastrar um aluguel com duração inferior a 24 horas.
- Não deve ser possível cadastrar um aluguel caso o usuário já possua um em aberto.
- Não deve ser possível cadastrar um aluguel para o mesmo carro para mais de um usuário no mesmo período.
- O usuário deve estar logado na aplicação para cadastrar um aluguel.
- Ao realizar um aluguel, o status do carro deverá ser - alterado para indisponível

# Devolução de carro 

**RF**
- Deve ser possível realizar a devolução de um carro

**RN**
- Se o carro for devolvido com menos de 24 horas, deverá - ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para - outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado - para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do - aluguel. 
- Caso o horário de devolução seja superior ao horário - previsto de entrega, deverá ser cobrado multa - proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação


# Listagem de Alugueis para usuário

**RF**
- Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
- O usuário deve estar logado na aplicação


# Recuperar Senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas