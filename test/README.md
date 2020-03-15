# AnD2 Test

## Browser test
Run:
```
$ npm start
```

App test running at: <b>http://localhost:5555</b>

## Upload to server test:

Make sure <b>"key.pem"</b> is in current directory

Push built app to server:
```
$ npm test
```

Don't foget to unzip app in server by running:
```
./unzip
```

App test running at <b>http://13.59.35.198:5555/</b>

Push specific file to server:
```
$ scp -i "key.pem" <file> ubuntu@ec2-13-59-35-198.us-east-2.compute.amazonaws.com:~/and2-test/
```