### Assignment #1 -  **Guidelines**

- Check whether the program correctly extracts the country, region, city, postcode, road, and road numbers from every page of every website.
- From a tech stack perspective, you can use any programming language, toolset or libraries you're comfortable with or find necessary, especially if you know it will be better or more interesting (we generally prefer Node, Python, Scala).

<h2>-UPDATE-:</h2>
Pentru fiecare request am modificat cancelToken(deprecatted) cu signals
<br>
Am observat ca nu pot trimite foarte multe request-uri in paralel de pe calculatorul meu, pentru ca dupa cateva request-uri ar incepe toate sa dea fail, asa ca am setat un Timeout in for de 30 de secunde, o data la fiecare 80 de request-uri.
<br>
<br>
Pentru fiecare website - obtin toate paginile care contin in a href unul dintre keyword-urile ['FAQ', 'F-A-Q', 'POLICY', 'CONTACT', 'ABOUT'], astfel reusesc sa extrag paginile importante in conformitate cu cerinta. Cum unele link-uri erau de tipul "/about" iar altele "http://www.example.com/about", am facut o verificare a primelor 4 caractere pentru a stii cum formez noul link si l-am adaugat in array-ul de pagini.
<br>
<br>
Am creat un classes.json pentru posibilele nume de clase ale elementelor care contin adrese si am parcurs fiecare element, in cautarea celor care contin una dintre clasele respective si am extras text-ul din ele. 
<br>
<br>
Am extras text-ul din footer.
<br>
<br>
Am creat un pattern special pentru a identifica o adresa valida si am verificat printr-o functie ca adresa respectiva sa nu se regaseasca deja in array-ul de adrese. 
<br>
<br>
Am observat ca un pattern pentru adrese: incepe cu 1-6 digits, se termina cu 5 digits, iar in interior contine intre 2 si 10 cuvinte separate prin spatii. Daca se respecta pattern-ul adaug adresa in array.
<br>
<br>
Pentru a gasi tara unei adrese, initial voiam sa folosesc o functie de mapping pentru fiecare oras in parte si sa returnez tara. Dar mi-am dat seama ca sunt foarte multe orase + ca nu pot obtine fiecare oras dintr-o adresa specifica, de exemplu: pentru New York, care contine 2 cuvinte sau o greseala mica de tipar din partea website-ului respectiv. Asa ca am folosit un google Geocoding API si am creat un nou array in care: Daca s-a gasit tara unei adrese, adaug adresa initiala + "," + "<country>". Daca nu sau am intampinat vreo eroare, adaug in nou array doar adresa initiala.
<br>
<br>
Modularitate - am organizat codul in fisiere separate pentru fiecare functionalitate in parte
<br>
<br>
<br>
<br>
Abordarea problemei: 
Am folosit duckdb ca sa extrag link-urile catre website-uri. Website-urile extrase le-am parcurs unul cate unul, si am creat o promisiune de tip Promise.all pentru a astepta ca request-urile sa fie finalizate.
In parcurgere, am trimis un request la pagina principala a fiecarui website prin axios si am creat un cancelToken, pentru a opri request-ul dupa 3000 de secunde, deoarece daca un request ar fi dat fail, dupa el, toate request-urile ar fi fost interpretate ca fail. 
Dupa primirea datelor din request, am folosit cheerio pentru manipularea datelor. Cu cheerio am extras textul fiecarui element care continea o clasa ce avea primele 6 caractere "contact". Am extras toate link-urile unui website tot cu ajutorul lui cheerio, tintind dupa atributul href al fiecarui element <a> si le-am adaugat in array-ul links.
Am iterat prin toate paginile website-ului cu ajutorul array-ului links, si am repetat procesul de cautare al unei clase care incepe cu "contact". Daca gasim o clasa "contact", verificam in adresele noastre curente ca text-ul sa nu existe deja, iar apoi apelam functia de verificare a adresei sa respecte cerintele problemei. Daca cele de mai sus sunt indeplinite adaugam adresa in array-ul addresses, iar la final returnam array-ul adddresses.

Request-urile au fost trimise printr-o functie async, pentru a putea fi trimise mai multe simultan. 
Pentru a testa algoritmul, am luat un array mai mic, unde am adaugat doar primele 50 de website-uri.

In rezolvarea problemei am efectuat o cautare manuala a adreselor pe primele 20 de pagini si am gasit niste tipare care se repeta.
As mai fi dorit sa adaug si o cautare dupa tag-ul <address> si o cautare in toata pagina dupa niste keyword-uri specifice adreselor cum ar fi Address, Location, Located in,  Street, Contact, prescurtarile oraselor "NY", "FL", etc.Iar atunci cand un anumit keyword este gasit, as fi tintit pentru parintele ce contine string-ul respectiv si parintele parintelui(pentru ca multe adrese se aflau in span, iar span-ul intr-un p.
