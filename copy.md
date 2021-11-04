Jesse Chong, CHONGJL
Mauricio Jr. Lomeli, MJLOMELI
Group 17

#ICS 53 Final Project

## TODO:

### Larger Scope
- [x] 3 types of threads
- [x] A main thread to accept connection from clients
- [x] A set of short-lived (dotted-line) client threads, one per connected client to read input from the client socket
- [x] A set of N job threads (consumer) to process the input from the clients. These threads never terminate (solid-line).
  What determines N?



### Username & password (shared data structure)
- [ ]	Username is unique no one can have the same username
- [x]	File descriptor
- [x]	Its in the main thread
- [x]	Consider reader/writer locking model

### Room (shared data structure)
- [ ]	Maintains information (room name, creator, current user)
- [ ]	Accessed by reading and modified by write job threads
- [x]	Consider a reader/writer locking model

### Job Buffer/Queue (shared data structure)
- [x]	Maintains all jobs (e.g. send a message, send message to a room, close a room, add a room)
- [x]	Requested by the connected clients via the client thread to be performed by a job thread when available
- [x]	Must follow the producer/consumer model
### Audit log
- [ ]	A shared output file to print logs of all events occur/handled by the main, client and job threads
- [ ]	Used to help debug your programs
- [ ]	Log events with date/time of the occurrence
- [ ]	Threads may require mutual exclusive access to write to this file to ensure correct logging
- [ ]	The log should include events such as:
    -	User added/denied with name, file descriptor, etc
    - Client thread created/terminated
    -	All messages received from a client, sent to a client
    -	When a job is inserted/removed from in the job buffer and by which thread


##### NOTE: Any functions or variables starting with __ (double underscores) is meant to be private or hidden. They are intended as helper functions or variables. Please refrain from using them. So by their intended nature, I will not be adding them to this document.

# 1.User
A shared data structure to maintaining information (e.g. username, file descriptor, etc)
about the current connected users. As this structure is accessed (read) and modified (write)
by various threads, it has a reader/writer locking model.

```c
typedef struct User_t {
    char * name;
} User;
```

## 1.1 ToString
```c
char * ToString(User * user)
```
Returns an allocated char* copy of the user's username. Since the
return is an allocated char*, you'll have to deallocate them on your end.

#### Getting char* on a User
```c
User * user = new_User("Thorton");
char * str = ToString(user);
printf(str);
free(str);
```
```shell
[1]: Thorton
```

## 1.2 Print
```c
char * Print(User * user)
```
Prints the ToString representation of User to stdout.

#### Printing a User
```c
User * user = new_User("Thorton");
Print(user);
```
```shell
[1]: Thorton
```

## 1.3 Repr
```c
char * Repr(User * user)
```
Represents User as its function representation in char*. Since the
return is an allocated char*, you'll have to deallocate them on your end.

#### Getting Repr on a User
```c
User * user = new_User("Thorton");
char * str = Repr(user);
printf(str);
free(str);
```
```shell
[1]: User(name=Thorton)
```

## 1.4 Copy
```c
void * Copy(User * user)
```
Makes a replica of a User. Since the return is an allocated object,
you'll have to deallocate them on your end.

#### Getting a copy of a User
```c
User * user = new_User("Thorton");
User * copy = Copy(user);
Print(copy);
```
```shell
[1]: Thorton
```

## 1.5 Comparator
```c
int Comparator(User * this_user, User * other_user)
```
Compares two Users by their username. It returns 0 if both are equal.
#### Comparing two users
```c
User * user = new_User("Thorton");
User * copy = Copy(user);
if (Comparator(user, copy) == 0)
    printf("They are the same.\n");
else
    printf("They are not the same.\n");
```
```shell
[1]: They are the same.
```

## 1.6 Nullify
```c
void Nullify(User * user)
```
Deallocates the User variables without deallocating the instance of the data structure.
#### Nullify a User
```c
User * user = new_User("Thorton");
Nullify(&user);
printf("user = %p\n", user);
printf("name = %s\n", user->name);
```
```shell
[1]: user = 0x211321421312
[2]: name = (null)
```

## 1.7 Destroy
```c
void Destroy(User * user)
```
Deallocates a User, freeing all if its data and setting them to NULL.
#### Deallocating a User with type cast
```c
User * user = new_User("Thorton");
User * copy = Copy(user);
Destroy((void**)&user);
Destroy((void**)&copy);
printf("user = %s\n", user);
printf("copy = %s\n", copy);
```
```shell
[1]: user = (null)
[2]: copy = (null)
```

#### Deallocating a User with void
```c
void * user = new_User("Thorton");
void * copy = Copy(user);
Destroy(&user);
Destroy(&copy);
printf("user = %s\n", user);
printf("copy = %s\n", copy);
```
```shell
[1]: user = (null)
[2]: copy = (null)
```


# 2. Function
This object encapsulates a function and its arguments. Its useful for the multithreading library which
only allows for one parameter passed to the threading function.

```c
typedef struct Function_t{
    void (* header)(); // pointer to the function
    void ** arguments; // pointers to the arguments
    int argc; // Number of arguments
}Function;
```

## 2.1 Allocate
```c
Function * func = new_Function(void * function, int argc, ...)
```
Creates a function wrapper to send to a processor to execute. The arguments must be pointers
as it will be assigned to a pointer to find it.

###**Examples**:

#### Allocating
```c
void login(LinkedList * list, char * name){
    Add(list, name)
    printf("Logged In: %s\n", name);
}

LinkedList * list = new_LinkedList();
char * my_name = strdup("WongMa");
Function * func = new_Function(login, 2, list, my_name);
```

## 2.2 Execute
```c
void execute(void * function)
```
When called, runs the **Function** type with the following arguments. **NOTE**: *calling the execute
function on your Function type will be deallocated the Function type after its first execution. The arguments passed will
not be deallocated. An example of what is meant is down below.*

###**Examples**:

#### Running execute
```c
void login(LinkedList * list, char * name){
    Add(list, name)
    printf("Logged In: %s\n", name);
}

LinkedList * list = new_LinkedList();
char * my_name = strdup("WongMa");
Function * func = new_Function(login, 2, list, my_name);
execute(func);
// Function * func <--- has been de-allocated by execute
// list <-- is not de-allocated
// my_name <-- is not de-allocated
```

## 2.3 ToString
```c
char * ToString(void * object)
```
Represents the function as an allocated char* representation. Since the
return is an allocated char*, you'll have to deallocate them on your end.
- If the function is NULL:
    - returns NULL.
- If the function doesn't have a ToString defined
    - returns NULL.
- If the function isn't "object" like:
    - Undefined behavior during casting representation.

###**Examples**:

#### Getting char* on a Function
```c
Function * func = new_Function(my_function, 2, "WongMa", 10);
char * str = ToString(func);
printf("%s\n", str);
Destroy((void**)&func);
free(str);
```
```shell
[1]: Function("WongMa", 10)
```

## 2.4 Print
Prints to stdout using the ToString representation.
- If the function is NULL:
    - Doesn't print.
- If the function doesn't have a ToString defined
    - Doesn't print.
- If the object isn't "object" like:
    - Undefined behavior during casting representation.

###**Examples**:
```c
Function * func = new_Function(my_function, 2, "WongMa", 10);
Print(func);
Destroy((void**)&func);
```
```shell
[1]: Function("WongMa", 10)
```

## 2.5 Destroy
```c
void Destroy(void * object)
```
Deallocates the function **but not the data it holds**.
###**Examples**:

#### Deallocating a Function with type caset
```c
char * person = strdup("WongMa");
Function * func = new_Func(my_func, "WongMa", 10);
Destroy((void**)&func);
free(person);
```


#### Deallocating a Function with void
```c
char * person = strdup("WongMa");
void * func = new_Func(my_func, "WongMa", 10);
Destroy(&func);
free(person);
```


# 3. Processor
A processor is a queue of multithreaded functions. It's primarily used by adding **Function** types to be
added into the queue. The processor runs the **Functions** in the order it was placed.

```c
typedef struct Processor_t{
    LinkedList * queue;     // list of executing **Function** types in order.
    LinkedList * standby;  // while its executing the **queue**, it can simultaneously accept incoming additions here.
    int thread_cnt;         // number of threads allowed to process for a computer.
    pthread_t ** tids;      // list of pthread_t to account for each thread
    sem_t queue_mutex, standby_mutex;   // controls the access of a queue and standby
}Processor;
```

## 3.1 Allocating
```c
Processor * proc = new_Processor(int number_of_threads);
```

Initializes a processor to handle the maximum number of threads given.

###**Examples**:
```c
Processor * proc = new_Processor(2); // able to use two threads
```


## 3.2 Adding
```c
void Add(void * processor, void * function)
```

Adds a **Function** to the **Processor** to handle the multithreading. *Adding alone
will not execute the function until the **Run** function is called on Processor.*

###**Examples**:
```c
Processor * proc = new_Processor(2); // able to use two threads
LinkedList * list = new_LinkedList();

char * username1 = strdup("WongMa");
Function * func1 = new_Function(login, 2, list, username1);
Add(proc, func1);

char * username2 = strdup("WongMa");
Function * func2 = new_Function(login, 2, list, username2);
Add(proc, func2);
```


## 3.3 Running
```c
void run(Processor * processor)
```
###**Examples**:
```c
Processor * proc = new_Processor(2); // able to use two threads
LinkedList * list = new_LinkedList();

char * username = strdup("WongMa");
Function * func = new_Function(login, 2, list, username);

Add(proc, func);
run(proc);
```

## 3.4 Destroy
```c
void Destroy(void * processor)
```
Deallocates any processor. Freeing all if its data and setting them to NULL.
If the processor has Functions waiting to be ran, it will have to wait until everything is finished running.
###**Examples**:

#### Deallocating a Processor with type cast
```c
Processor * proc = new_Processor(2); // able to use two threads
Destroy((void**)&proc);
```

#### Deallocating a Processor with void
```c
void * proc = new_Processor(2); // able to use two threads
Destroy(&proc);
```


# 4. Jobs/Credentials

## 4.1 Login

```c
unsigned long int login(char * username, LinkedList * list)
```
To request to be added into the server, call this function with a unique username and
the LinkedList containing all users in the server.
- If the username isn't taken:
    - Your username will be added to the list of current users on the server (the LinkedList) and returns a confirmation
      code of OK (0x00).
    - You should then spawn a client thread.
- Else the username is already taken:
    - Sends a rejection to you as a return code EUSREXISTS (0x1A).
    - You should close the connection.

###**Examples**:

#### When a login is successful
```c
LinkedList * list = new_LinkedList(); // empty list
unsigned long int status = login("Thorton", list);
if (status == OK)
    printf("Login Successful.\n");
else
    printf("ERROR: Username exists.\n")
```
```shell
[1]: Login Successful
```

#### When a login is unsuccessful
```c
LinkedList * list = new_LinkedList(); // empty list
login("Thorton", list); // added Thorton
login("WongMa", list);  // added WongMa
login("Klefstad", list);// added Klefstad

unsigned long int status = login("Thorton", list); //  note: Thorton is already in the list
if (status == EUSEREXISTS)
    printf("ERROR: Login - Username exist.\n")
else     
    printf("Login Successful.\n");
```
```shell
[1]: ERROR: Login - Username exists.
```

## 4.2 Logout
```c
void logout(char * username, LinkedList * list)
```
To request to be removed from the server, call this function with the username and
the LinkedList containing all users in the server.
- If the username exists in the server:
    - The user is removed from the list
    - The return code is OK (0x00).
- Else the username doesn't exist in the server:
    - The return code is EUSRNOTFOUND (0x3A)

###**Examples**:

#### When a logout is successful
```c
LinkedList * list = new_LinkedList(); // empty list
login("Thorton", list); // added Thorton
login("WongMa", list);  // added WongMa
login("Klefstad", list);// added Klefstad

logout("Thorton", list); //  note: Thorton is already in the list
if (status == OK)
    printf("Logout Successful.\n");
else
    printf("ERROR: Logout - Username doesn't exist in the server.\n")
```
```shell
[1]: Logout Successful.
```

#### When a logout is unsuccessful
```c
LinkedList * list = new_LinkedList(); // empty list
unsigned long int status = logout("Thorton", list);
if (status == EUSRNOTFOUND)
    printf("ERROR: Logout - Username does not exist in the server.\n")
else
    printf("Logout Successful.\n");
    
```
```shell
[1]: ERROR: Logout - Username does not exist.
```

##### NOTE: Any functions or variables starting with __ (double underscores) is meant to be private or hidden. They are intended as helper functions or variables. Please refrain from using them. So by their intended nature, I will not be adding them to this document.

#5. LinkedList
A LinkedList is used for storing users in the server.

```c
typedef struct LinkedList_t{
  int length;
  Node * head;
  Node * tail;
}LinkedList;
```

## 5.1 Add
```c
void Add(LinkedList * list, void * item)
```
Adds an item to the LinkedList. If the item is NULL, no action
will be taken and nothing will be appended to the list.

#### Adding to a LinkedList
```c
LinkedList * list = new_LinkedList(); // empty list
User * user = User("Thorton");
Add(list, user);
```

## 5.2 Remove (*unsettled*)
```c
void Remove(LinkedList * list, item)
```
Removes an item from the LinkedList and de-allocating. The item must have a Comparator
defined function linked to it to work.

#### Removing from a LinkedList
```c
LinkedList * list = new_LinkedList(); // empty list
User * user_1 = User("Thorton");
User * user_2 = User("WongMa");
User * user_3 = User("Klefstad");
Add(list, user_1);
Add(list, user_2);
Add(list, user_3);

User * to_remove = User("Thorton");
Remove(list, to_remove);
```

## 5.3 Get (*unsettled*)
```c
void * Get(LinkedList * list, void * item)
```
Finds an item in the list and returns whichever the Comparator first matches it.

#### Using Get on a LinkedList
```c
LinkedList * list = new_LinkedList(); // empty list
User * user_1 = User("Thorton");
User * user_2 = User("WongMa");
User * user_3 = User("Klefstad");
Add(list, user_1);
Add(list, user_2);
Add(list, user_3);

User * to_get = User("Thorton");
User * user_found = Get(list, to_get);
```

## 5.4 Contains (*unsettled*)
```c
int Contains(LinkedList * list, void * item)
```
Checks to see if an item exists in the list. Returns 1 if it exists, else 0.

#### Check if an item exists in a LinkedList
```c
LinkedList * list = new_LinkedList(); // empty list
User * user_1 = User("Thorton");
User * user_2 = User("WongMa");
User * user_3 = User("Klefstad");
Add(list, user_1);
Add(list, user_2);
Add(list, user_3);

User * to_find = User("Thorton");
if (Contains(list, to_find))
    printf("Thorton was found.\n")
else
    printf("Thorton was not found.\n")
```
```shell
[1]: Thorton was found.
```

## 5.5 ToString
```c
char * ToString(LinkedList * list)
```
Represents a list as an allocated char* representation. Since the
return is an allocated char*, you'll have to deallocate them on your end.

#### Getting char* on a LinkedList
```c
LinkedList * list = new_LinkedList(); // empty list
login("Thorton", list);
login("WongMa", list);
login("Klefstad", list);
char * str = ToString(list);
printf(str);
free(str);
```
```shell
[1]: {Thorton, WongMa, Klefstad}
```

## 5.6 Print
```c
char * Print(LinkedList * list)
```
Prints to stdout a LinkedList from their ToString representation.

#### Getting char* on a LinkedList
```c
LinkedList * list = new_LinkedList(); // empty list
login("Thorton", list);
login("WongMa", list);
login("Klefstad", list);
Print(list);
```
```shell
[1]: {Thorton, WongMa, Klefstad}
```

## 5.7 Repr

```c
char * Repr(LinkedList * list)
```
Represents a LinkedList in its function representation as a char*. Since the
return is an allocated char*, you'll have to deallocate them on your end.

#### Getting Repr on a LinkedList
```c
LinkedList * list = new_LinkedList(); // empty list
login("Thorton", list);
login("WongMa", list);
login("Klefstad", list);
char * str = Repr(list);
printf(str);
free(str);
```
```shell
[1]: LinkedList(length=3, data={Thorton, WongMa, Klefstad})
```

## 5.8 Nullify
```c
void Nullify(LinkedList * list)
```
Deallocates a LinkedList's variables without deallocating the instance of the LinkedList.
Therefore, Freeing all the list's variables and setting them to NULL. All internal nodes
are also safely freed.

#### Nullify a LinkedList
```c
LinkedList * list = new_LinkedList(); // empty list
login("Thorton", list);
login("WongMa", list);
login("Klefstad", list);

Node * head = list->head;
Nullify(list);

printf("list = %p\n", list);
printf("head = %s\n", list->head);
```
```shell
[1]: list = 0x211321421312
[2]: head = (null)
```

## 5.9 Destroy
```c
void Destroy(LinkedList * list)
```
Deallocates a LinkedList and all of its data.

#### Deallocating a LinkedList with type cast
```c
LinkedList * list = new_LinkedList(); // empty list
login("Thorton", list);
login("WongMa", list);
login("Klefstad", list);

Node * head = list->head;

Destroy((void**)&list);
printf("list = %s\n", list);
printf("head = %s\n", head);
```
```shell
[1]: list = (null)
[2]: head = (null)
```
#### Deallocating a LinkedList as void
```c
void * list = new_LinkedList(); // empty list
login("Thorton", list);
login("WongMa", list);
login("Klefstad", list);

Destroy(&list);
printf("list = %s\n", list);
```
```shell
[1]: list = (null)
[2]: head = (null)
```
