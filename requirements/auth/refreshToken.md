# Refresh Token

> ## Caso de sucesso
> ✅ Recebe uma requisição POST na rota /api/auth/refresh com refreshToken, deviceId, userAgent
> ✅ Valida o refreshToken
> ✅ Detecta replay (replacedById presente) → revoga sessões
> ✅ Cria novo refreshToken e marca o anterior como revogado
> ✅ Gera novo accessToken
> ✅ Retorna 200 com accessToken e refreshToken

> ## Exceções
> ❌ 400 se token ou deviceId ausente
> ❌ 401 se token inválido, expirado ou revogado
> ❌ 403 se replay detectado
> ❌ 500 em erro ao gerar ou persistir tokens
