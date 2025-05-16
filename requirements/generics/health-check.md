# Health Check

> ## Caso de sucesso

> 1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/health-check**
> 6. ✅ Retorna **200** com o status
> ## Exceções

> 1. ❌ Retorna erro **404** se a API não existir
> 2. ❌ Retorna erro **400** se `email` ou `password` não forem fornecidos pelo client
> 3. ❌ Retorna erro **401** se não encontrar a conta com os dados fornecidos
> 4. ❌ Retorna erro **500** se der erro ao tentar gerar o token de acesso
> 5. ❌ Retorna erro **500** se der erro ao tentar atualizar a conta com o token de acesso gerado
