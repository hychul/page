https://secure.vexxhost.com/billing/index.php/knowledgebase/171/How-can-I-generate-SSH-keys-on-Mac-OS-X.html
https://serverfault.com/questions/939909/ssh-keygen-does-not-create-rsa-private-key

```terminal
$ ssh-keygen
```

```terminal
-----BEGIN OPENSSH PRIVATE KEY-----
XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx
...
-----END OPENSSH PRIVATE KEY-----
```

```terminal
$ ssh-keygen -m PEM -t rsa
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /Users/user/.ssh/id_rsa.
Your public key has been saved in /Users/user/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx user@XxXxXxXxXxXxXxXxXx
The key's randomart image is:
+---[RSA 3072]----+
|           oo=.. |
|           +o o.=|
|          ..+.o.o|
|          .E. ..=|
|        S oo=...+|
|         +.o+..=.|
|          o==...+|
|        o.*+.=.o.|
|         =o*.o.o.|
+----[SHA256]-----+
```

```terminal
$ cat id_rsa
-----BEGIN RSA PRIVATE KEY-----
XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx
...
-----END RSA PRIVATE KEY-----
```