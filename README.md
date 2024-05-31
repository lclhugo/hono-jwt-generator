```bash
pnpm install
pnpm dev
```

create a .env based on .env.example

POST json on `http://127.0.0.1:3000/api/jwt/generate`

json example: 
```json
{
  "sub": "optional_subject_string",
  "roles": ["optional_role1", "optional_role2"],
  "claims": {
    "optional_claim_key1": "optional_claim_value1",
    "optional_claim_key2": "optional_claim_value2"
  }
}
```



