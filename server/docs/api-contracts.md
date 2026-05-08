# API Contracts

All JSON responses use this envelope:

```json
{
  "success": true,
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {}
  }
}
```

## Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

## Family

- `POST /api/families`
- `POST /api/families/join`
- `GET /api/families/me`

## Planning

- `GET /api/events`
- `POST /api/events`
- `GET /api/reminders`
- `POST /api/reminders`
- `PATCH /api/reminders/:id/complete`

## Suggestions And Wishes

- `GET /api/suggestions`
- `POST /api/suggestions`
- `POST /api/suggestions/:id/vote`
- `PATCH /api/suggestions/:id/status`
- `GET /api/wishes`
- `POST /api/wishes`
