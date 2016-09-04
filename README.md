# errand-boy

**Table of Content**

## File manager

### Date Model

*Link*
Link to related resource.
```
{
    self: URI,
    parent: URI
}
```

*TypeEnum*
```
[
    "file",
    "directory"
]
```


*Element*
The smallest element meta data. 
```
{
    link: Link,
    name: String,
    type: TypeEnum
}
```

### API

From ```{baseUrl}/file/```, the URI components will represent the directory structure. If the URI component is a directory, then it will return the directory tree structure, if the URI component is a file, then it will either start download or open depends on what the file is. 

For example, the directory structure is ```/path/to/directory``` then the request is ```{baseUrl}/file/path/to/directory```. 

*Response*
```
{
    self: Element,
    child: [Element]
}
```

