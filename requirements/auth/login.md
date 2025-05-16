# Login

> ## Caso de sucesso
> ✅ Recebe uma requisição POST na rota /api/auth/login com email, password, deviceId
> ✅ Valida credenciais
> ✅ Gera accessToken e refreshToken
> ✅ Revoga tokens antigos para o mesmo userId + deviceId
> ✅ Persiste o novo refreshToken com userAgent
> ✅ Retorna 200 com accessToken e refreshToken

> ## Exceções
> ❌ 400 se email, password ou deviceId ausentes
> ❌ 401 se credenciais inválidas
> ❌ 500 em erro ao criar ou revogar token
