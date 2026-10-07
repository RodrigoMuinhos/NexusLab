# Nexus Lab

Frontend React/Vite e backend Node.js independentes. Requer Node.js 22.9+ (Node 24 recomendado) e npm.

## Executar localmente

Na pasta `Nexus Lab Website Design`:

```sh
npm install
npm run dev
```

- Site: http://localhost:5174
- API: http://localhost:3001/api/health

O comando inicia os dois serviços; Ctrl+C encerra ambos. Para iniciar separadamente, use `npm run dev:frontend` e `npm run dev:backend` em terminais distintos.

## Estrutura

- `frontend/`: interface, imagens, estilos e configuração Vite.
- `backend/`: API HTTP e armazenamento das solicitações.
- `scripts/dev.mjs`: execução conjunta em desenvolvimento.

O formulário envia `POST /api/contacts` com `name`, `email`, `company`, `interest` e `idea`. A API valida e grava os registros em `backend/data/contacts.jsonl`. Não há envio automático de e-mail nem painel administrativo. Os dados não são expostos por endpoints de leitura.

## Configuração

Copie `.env.example` para `.env` em cada serviço se precisar alterar os padrões. O frontend usa proxy `/api` no desenvolvimento. Para alterar o destino do proxy, defina `API_PROXY_TARGET` em `frontend/.env` ou no ambiente do processo Vite. `VITE_API_URL` é incorporada ao bundle durante o build e deve conter a URL pública do backend, sem `/api` no final. Nunca coloque segredos em variáveis `VITE_*`.

## Deploy independente

### Vercel: publicar somente o frontend

Importe este repositório na Vercel. Pode usar a raiz do repositório (saída `frontend/dist`) ou definir Root Directory como `frontend` (saída `dist`); os arquivos `vercel.json` configuram ambos os casos. O backend não é publicado por essas configurações.

Deixe `VITE_API_URL` sem configuração enquanto o backend não estiver publicado. Nesse modo, o formulário abre o aplicativo de e-mail com a mensagem preenchida; o usuário precisa enviá-la por lá. As fotos são armazenadas diretamente no Git, sem depender de download via Git LFS.

1. Frontend: configure `VITE_API_URL=https://api.seu-dominio.com`, execute `npm run build` na raiz e publique `frontend/dist` em um serviço de hospedagem estática. Se houver proxy de produção de `/api` para o backend no mesmo domínio, deixe `VITE_API_URL` vazia.
2. Backend: publique a pasta `backend`, use Node.js 22.9+ e execute `npm start`. Configure `HOST=0.0.0.0`, `PORT` conforme o provedor e `FRONTEND_ORIGIN=https://seu-dominio.com` (múltiplas origens separadas por vírgula).
3. Defina `DATA_DIR` apontando para um volume persistente. O armazenamento atual em arquivo serve para uma única instância; para múltiplas instâncias, migre para um banco de dados compartilhado. Em hospedagem com disco efêmero, os contatos se perdem sem volume persistente.

Antes de expor o formulário publicamente, configure proteção contra spam/limitação de requisições no provedor ou na API.

## Verificação

```sh
npm run check
npm run build
```
