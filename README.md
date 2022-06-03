# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um novo carro com uma placa já existente.
O carro deve ser cadastrado como disponível como padrão.
* O usuário responsável pelo cadastro deve possuir privilégios de administrador. (Isso não é responsabilidade do CreateCarUseCase)

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome (modelo).
Deve ser possível listar todos os carros disponíveis pelo marca.
Deve ser possível listar todos os carros disponíveis pelo categoria.

**RN**
Deve ser possível realizar a listagem sem estar logado no sistema.

# Cadastro de especificação do carro

**RF**
Deve ser possível cadastrar uma nova especificação para o carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
O usuário responsável pelo cadastro deve possuir privilégios de administrador.
Não deve ser possível duplicar uma especificação para um mesmo carro.
Não deve ser possível cadastrar uma especificação para um carro inexistente.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para o upload dos arquivos.

**RN**
O usuário responsável pelo cadastro deve possuir privilégios de administrador.
Deve ser possível cadastrar mais de uma imagem por carro.

# Aluguel

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
Não deve ser possível cadastrar um aluguel com duração inferior a 24 horas.
Não deve ser possível cadastrar um aluguel caso o usuário já possua um em aberto.
Não deve ser possível cadastrar um aluguel para o mesmo carro para mais de um usuário no mesmo período.