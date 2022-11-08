# Notify Github Release

You can see when a new release is available for a target repository on Github, right from the CUI!

# necessary

- [Install the latest stable version of Node.js.](https://nodejs.org/)

# Install

## Step1

```bash
npm install -g notify-github-release
```

## Step2

### Add information to the NOTIFICATION_TARGET file


```bash
# exmple
ngr -a https://github.com/RocketChat/Rocket.Chat
ngr -a https://github.com/microsoft/playwright
```


# Execute
```
ngr
```

![image](https://user-images.githubusercontent.com/40861943/200334990-776ccbec-bc7e-4f90-bb7f-0083c5227c4a.png)

# Warning
In the current specification, processing is based on the image version value. Repositories that do not show a value here will not work correctly.

![image](https://user-images.githubusercontent.com/40861943/200598396-48be3f46-184f-4926-8772-c52ee9376d66.png)

# Options
```bash
$ ngr -h
Usage: index [options]

Options:
  -V, --version    output the version number
  -a, --add <url>  Add notification target ex: https://github.com/<username>/<repository> (default: null)
  -l, --list       List the target URLs.
  -d, --del <no>   Delete the target URL. (default: null)
  -h, --help       display help for command
```

