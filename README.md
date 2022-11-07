# Notify Github Release

You can see when a new release is available for a target repository on Github, right from the CUI!

# necessary

- [Install the latest stable version of Node.js.](https://nodejs.org/)

# Install

## Step1

```
npm install -g notify-github-release
```

## Step2

### Add information to the NOTIFICATION_TARGET file

The URL and version listed in this file will be compared with the latest version information on Github.

### Sample description

`https://github.com/<username>/<repository1>` v1.23.4  
`https://github.com/<username>/<repository2>` 5.6.7

# Execute
```
npm run ngr
```

![image](https://user-images.githubusercontent.com/40861943/200334990-776ccbec-bc7e-4f90-bb7f-0083c5227c4a.png)
