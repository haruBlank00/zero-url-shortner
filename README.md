I have seperated client / server 
though I wanted to change it to mono-repo 
to share types and constants between client and server

But due to time constraints 
I didn't dare to 

My client has seperate git init
so in rush, I pushed client and serve in one commit 
losing individual folder git history

- My client is in React with tanstac router

Run `cd client && npm install && npm run dev` to start the client in dev mode



- My server is in express with postgres db and prisma orm

I decided to go with vanilla express instead of using backend framework
to showcase my coding ability

run `cd server && npm install && npm run dev`

I haven't been able to test thoroughly.
Everything was done in a hurry, so I hope it works on your computer too.
