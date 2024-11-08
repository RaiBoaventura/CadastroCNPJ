

### **README.md**


# Cadastro de Pessoa Jurídica – JR DIAS

## 📋 Sobre o Projeto
Este projeto tem como objetivo automatizar o processo de cadastro de Pessoa Jurídica, que atualmente é realizado manualmente. A interface web foi desenvolvida para agilizar o registro de novos clientes e permitir que vendedores possam acessar e visualizar os cadastros realizados, facilitando a consulta e a análise de dados.

## ✨ Funcionalidades
- Cadastro completo de Pessoa Jurídica.
- Preenchimento automático de campos através da consulta de CNPJ via API.
- Interface responsiva e acessível para desktop e dispositivos móveis.
- Controle de acesso para clientes e vendedores.
- Upload de documentos necessários para o cadastro.

## 📝 Escopo
- **Clientes:** Realizarão o cadastro diretamente na interface web.
- **Vendedores:** Poderão acessar e visualizar os cadastros realizados para consulta e análise.

## 📑 Campos do Cadastro
### 1. **Dados da Pessoa Jurídica**
- Razão Social
- Nome Fantasia
- CNPJ
- Inscrição Estadual
- Ramo de Atividade
- Data de Fundação
- Capital Social
- Endereço (Logradouro, Número e Complemento, Bairro, Cidade, UF, CEP)
- Telefone(s)
- E-mail
- Site
- Nome do Contador
- Telefone do Contador

### 2. **Dados dos Sócios**
Cada sócio terá os seguintes campos:
- Nome
- Endereço (Logradouro, Número e Complemento, Bairro, Cidade, UF, CEP)
- Telefone(s) de Contato
- E-mail

### 3. **Referências Comerciais**
Para cada fornecedor, incluir:
- Nome do Fornecedor
- Telefone
- Ramo
- Contato
- Cliente Desde (Data)
- Compra Acumulada
- Data da Última Compra
- Valor da Última Compra
- Data da Maior Compra
- Valor da Maior Compra
- Limite de Crédito
- Forma de Pagamento (À Vista/A Prazo)
- Pontualidade (Sim/Não)

### 4. **Referências Bancárias**
Até 2 bancos podem ser cadastrados, com os seguintes campos:
- Banco
- Agência
- Conta
- Data de Abertura
- Telefone
- Gerente
- Observações

### 5. **Dados do Vendedor/Representante**
- Média de Compras Mensal (Projetada)
- Limite de Crédito Sugerido
- Parecer do Vendedor

## 🛠️ Requisitos Não Funcionais
### 1. **Segurança**
- Autenticação e controle de acesso para clientes e vendedores.
- Criptografia para dados sensíveis (CNPJ, informações bancárias).
- Validação de campos para evitar entradas inválidas.

### 2. **Usabilidade**
- Interface responsiva e acessível para desktop e celular.
- Mensagens de erro claras e sugestivas para facilitar a correção dos dados.
- Indicação visual para campos obrigatórios.

### 3. **Desempenho e Escalabilidade**
- Otimização para desempenho rápido e eficiente.
- Escalabilidade para permitir o crescimento do número de cadastros e integração futura com sistemas de ERP.

## 🔗 Integrações
- **Consulta de CNPJ:** Integração com a API da Receita WS para validação automática do CNPJ e preenchimento de dados da empresa.

## 🖥️ Protótipo da Interface
O wireframe foi criado para demonstrar a interface e inclui:
- Layout da página de cadastro.
- Posicionamento dos campos e seções.
- Indicação de validações e mensagens de erro.

## 🧪 Plano de Testes
### Testes Funcionais
- Verificação de preenchimento correto de todos os campos.
- Preenchimento automático a partir da consulta de CNPJ.

### Testes de Usabilidade
- Avaliação da facilidade de uso e clareza da interface.

### Testes de Segurança
- Validação contra injeção de SQL, Cross-Site Scripting (XSS).

### Testes de Compatibilidade
- Testes em diferentes navegadores (Chrome, Firefox, Edge) e dispositivos (desktop, tablet, celular).

## 📄 Documentos Necessários para Cadastro
Os clientes devem anexar cópias dos seguintes documentos:
- Contrato Social e última alteração.
- Cartão CNPJ atualizado.
- Relação de faturamento dos últimos 12 meses, assinada pelo contador.

## 📚 Anexos
- **Glossário:** Definição de termos utilizados (ex.: CNPJ, Inscrição Estadual).
- **Referências Externas:** Links para APIs de consulta de CNPJ e documentação de integração.



