# Logout

> ## Caso de sucesso
> ✅ Recebe POST em /api/auth/logout com refreshToken
> ✅ Revoga o token informado (flag + revokedAt)
> ✅ Retorna 204 sem corpo

> ## Exceções
> ❌ 400 se refreshToken ausente
> ❌ 404 se token não encontrado
> ❌ 500 se erro ao revogar
