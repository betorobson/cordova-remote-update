cordova-remote-update
==========

> Remote update your Cordova App based on https://github.com/markmarijnissen/cordova-app-loader

The aim of this project is help who has been facing some dificults to implement the cordova-app-loader.
It can easily help you make an Mobile App that can be remote update.
It is extremely important that you follow all steps. 

This instructions presume that you will run it on Mac OS X or Linux Environment.

## What do you need before start:

1. Node.js
2. NPM
3. Gulp - Global installation
4. Cordova - Global installation
5. [for iOS] An Apple Computer running Mac OS X
6. [for iOS] Xcode 6.4+
7. [for Android] An Android Device 

 * It is not recommended test it on Android Emulator.

## What do you need to know:

1. Set up a Web Server
2. Change host file
3. Set up a proxy (my suggestion, squidman)

## Installation

#### 1. Clone this project
```bash
git clone https://bitbucket.org/betorobson/cordova-remote-update.git cordova-remote-update
```

#### 2. Install npm packages and run gulp tasks
```bash
cd cordova-remote-update
npm install
gulp
```

#### 3. Web Server
Set up your Web Server to resolve the domain `cordovaremoteupdate.dev` and point it to folder `remote-files` inside your project folder.
If are you using apache, you can make it editing the vhost like this example:
```XML
<VirtualHost *:80>
    DocumentRoot "/var/www/cordova-remote-update/remote-files/"
    ServerName cordovaremoteupdate.dev
</VirtualHost>
```
 * Do not forget modify the DocumentRoot, you must put there your folder project full path + `/remote-files`

#### 5. Host file

Edit your host file as sudo, it might be at:
`/etc/host` 

Add on the bottom file the follow line:
```
127.0.0.1 cordovaremoteupdate.dev
```

#### 6. Testing your environment
Open any browser and type:
http://cordovaremoteupdate.dev/
You must see a gray color page which containing a pharse: `appWrapper`

#### 6. Proxy
This is the most important thing. You must set up it and be sure that it is working properly.
So, if you are not familiar with how to set up it, I strongly recommed you install squidman.

It will make your devices able to access the address `cordovaremoteupdate.dev`. If you remember, we did it one step before.

Install it from http://squidman.net/, and follow all instructions. 
It is painless :)

When you finished, you must open squidman.

##### 6.1 subnet clients
Add on Clients section your wifi ip subnet, for example: `192.168.2.0/24`

##### 6.2 Remove Domains
Remove any domain on Direct section

##### 6.3 Template Section
On template section find the following section:

```
# protect web apps running on the proxy host from external users
http_access deny to_localhost
```
And comment out the second line with a #.

##### 6.4 Host file
Next, you need to tell Squid where your hosts file is
```
# hosts file
hosts_file /etc/hosts
```

 * Even if after follow these proxy instructions you did not make it, have a look in this article
 http://egalo.com/2012/05/29/testing-mac-web-site-using-local-hostname-on-mobile-device/

#### 7. Testing your proxy.

 * Before start it, be sure your webserver is running.

##### 7.1 On Squidman window, click on Start Squid Button.

(http://egalo.com/uploads/2012/05/SquidMan-main-window.png)

##### 7.2 Set up proxy on iOS and Android

For Android, follow these instructions
http://webcazine.com/13617/android-5-0-lollipop-how-to-setup-proxy-server/

For iOS, follow these instructions
http://www.ibvpn.com/billing/knowledgebase/72/How-to-configure-proxy-usage-for-iphoneoripad.html

Do not forget to put your computer IP on proxy setup, also put there port number `8080`

Now you whould be able to browse through the proxy on your computer. To be sure, open a browser like Chrome or Safari, type http://www.google.com/ and then try make a search.
After that, if you can browse on internet, your are fine to the next step.

##### 7.3 Testing your remote files on browser

In both of your devices, open a browser and type `http://cordovaremoteupdate.dev/`.
You must see a gray color page which containing a pharse: `appWrapper`, it must be the same what happen on step 6.

#### 8. Run gulp

Run the command bellow on terminal, inside your project folder. It will generate all your remote files.

```bash
gulp
```
You might see something like that:
```bash
[18:23:28] Starting 'default'...
[18:23:28] Starting 'mobile'...
[18:23:28] Starting 'copyMobileAppFilesToMobileRemoteFolder'...
[18:23:28] Finished 'mobile' after 15 ms
[18:23:28] Finished 'default' after 17 ms
[18:23:28] Finished 'copyMobileAppFilesToMobileRemoteFolder' after 102 ms
[18:23:28] Starting 'bumpTimestampFile'...
[18:23:28] Finished 'bumpTimestampFile' after 8.62 ms
[18:23:28] Starting 'mobileMarkup'...
[18:23:28] Finished 'mobileMarkup' after 39 ms
[18:23:28] Starting 'generateManifest'...
[18:23:28] Finished 'generateManifest' after 52 ms
[18:23:28] Starting 'copyRemoteMobileFolderToMobileFolder'...
[18:23:28] Finished 'copyRemoteMobileFolderToMobileFolder' after 34 ms
[18:23:28] Starting 'bumpTimestampFile'...
[18:23:28] Finished 'bumpTimestampFile' after 2.23 ms
[18:23:28] Starting 'generateManifest'...
[18:23:28] Finished 'generateManifest' after 43 ms
```
Now your remote files were generated. Before compile your app, it would be better try another test on your devices.

#### 9. Compile Cordova App Project

