# Logout Global (revogar todas as sessões)

> ## Caso de sucesso
> ✅ Recebe POST em /api/auth/logout-all autenticado
> ✅ Revoga todos os tokens do usuário (userId)
> ✅ Retorna 204

> ## Exceções
> ❌ 401 se sem autenticação
> ❌ 500 se erro ao revogar tokens
