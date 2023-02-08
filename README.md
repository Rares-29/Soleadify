### Assignment #1 -  **Guidelines**

- Check whether the program correctly extracts the country, region, city, postcode, road, and road numbers from every page of every website.
- From a tech stack perspective, you can use any programming language, toolset or libraries you're comfortable with or find necessary, especially if you know it will be better or more interesting (we generally prefer Node, Python, Scala).

Abordarea problemei: 
Am folosit duckdb ca sa extrag link-urile catre website-uri. Website-urile extrase le-am parcurs unul cate unul, si am creat o promisiune de tip Promise.all pentru a astepta ca request-urile sa fie finalizate.
In parcurgere, am trimis un request la pagina principala a fiecarui website prin axios si am creat un cancelToken, pentru a opri request-ul dupa 3000 de secunde, deoarece daca un request ar fi dat fail, dupa el, toate request-urile ar fi fost interpretate ca fail. 
Dupa primirea datelor din request, am folosit cheerio pentru manipularea datelor. Cu cheerio am extras textul fiecarui element care continea o clasa ce avea primele 6 caractere "contact". Am extras toate link-urile unui website tot cu ajutorul lui cheerio, tintind dupa atributul href al fiecarui element <a> si le-am adaugat in array-ul links.
Am iterat prin toate paginile website-ului cu ajutorul array-ului links, si am repetat procesul de cautare al unei clase care incepe cu "contact". Daca gasim o clasa "contact", verificam in adresele noastre curente ca text-ul sa nu existe deja, iar apoi apelam functia de verificare a adresei sa respecte cerintele problemei. Daca cele de mai sus sunt indeplinite adaugam adresa in array-ul addresses, iar la final returnam array-ul adddresses.

Request-urile au fost trimise printr-o functie async, pentru a putea fi trimise mai multe simultan. 
Pentru a testa algoritmul, am luat un array mai mic, unde am adaugat doar primele 50 de website-uri.

In rezolvarea problemei am efectuat o cautare manuala a adreselor pe primele 20 de pagini si am gasit niste tipare care se repeta.
As mai fi dorit sa adaug si o cautare dupa tag-ul <address> si o cautare in toata pagina dupa niste keyword-uri specifice adreselor cum ar fi Address, Location, Located in,  Street, Contact, prescurtarile oraselor "NY", "FL", etc.Iar atunci cand un anumit keyword este gasit, as fi tintit pentru parintele ce contine string-ul respectiv si parintele parintelui(pentru ca multe adrese se aflau in <span> si span-ul intr-un <p>.
