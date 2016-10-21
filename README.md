# jenkinsbot
Slack bot, capable of executing some Jenkins command remotely

## Installation

1. Rename _.env.template_ to _.env_ (generate valid tokens in Slack and Jenkins before)
2. Insert correct values to _.env_ file
3. Run ```npm install``` to fetch dependencies
4. Run ```npm start``` to start the bot

## Available commands

```jenkins disable job_name```

Disables job by name

```jenkins enable job_name```

Enables job by name

```jenkins log name```

Gets the log of most recent build of given job:

```
Started by remote host 127.0.0.1
Building in workspace /var/jenkins_home/jobs/remove_it/workspace
Finished: SUCCESS
```

```jenkins build name```

Executes given job

```jenkins info```

Displays the summary of a server

```
Server summary:
Description: # Jenkins Server @ 127.0.0.1
No of executors: 8
View URL: http://127.0.0.1/
```

```jenkins jobs```

List the jobs available on a server

```
Available jobs: 
0: 
Name: Build image 
Stuck: http://127.0.0.1/build_image/ 
1: 
Name: Deploy image 
Stuck: http://127.0.0.1/deploy_image/ 
```
