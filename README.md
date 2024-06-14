# Initial commit

# Run the Frontend

```bash
cd client
npm install
npm run dev
```

# Run the API, make sure you have your MySQL database running in local

## FastAPI backend - main branch

```bash
cd server
pip install -r requirements.txt
uvicorn src.main:app --workers=5
```

## ASP.NET Web API - Csharp-API branch

```bash
cd csharp-server
cd MovieAPI
dotnet restore
dotnet build
dotnet run
```


