This is a public repostiory that was created during a MSc. Computer Science Project and University College London in cooperation with NHS digital.

The goal was to develop a architecture that usees intelligent personal assitants for Telehealth. Particullary, this repository contains a stand-alone solution consisting of an Alexa Skill and a Web App. The following descirbes the use-case perspective.
Afterwards a developer-instruction is presented.

![Project Canavas](https://github.com/danielkremerov/AIArchitectureTelehealth/blob/master/Canvas.png)

Video Presentation: http://bit.ly/DemoMaster

Developer - Instructions:

SKill setup:
 1. Register on the following website: https://developer.amazon.com/
 2. Create a new Alexa Skill
 3. Go to Skill Builder an paste the code from interaction.json
 4. Make sure the language is set to English(UK)
 5. Register on https://aws.amazon.com/
 6. Create a zip file out of all Skill deliverables and upload it to AWS Lambda and receive an arn-number
 7. Link the Skill and the package via the arn number ("under Skill configurations")
 8. Now the Skill can be used in the test-section of developer.amazon.com or select "beta testing" and deploy it to your Echo     device
 
 Web app setup:
 1. Install NodeJS from https://nodejs.org/
 2. clone "app-client" folder to your harddrive and open the directory in the terminal
 3. Type "npm install"
 4. Type "npm run start". Note that the app only runs on node 4.7. and higher. If receiving an error, install NVM and run "nvm     node v4.7" in the "app-client" directory
5. open localhost:3000 in any browser
6. optionally you can deploy the backend functions on another server. They are all included in "app-api" folder. Note, that      this requires changing the configurations in "aws.config" file in "app-client" and "app-api"
7. Optionally another database can be used, this requires changes in the "database.js" file in "app-client".

Note, the folder "general", contains Interfaces and Dialog Model code to be used for other projects.
