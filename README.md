Parkour Academy fysmaskin
=========================

Web app that generates a death-by-dice message. You roll dice and the dice tells you what to do.

This app has not been beta tested yet.

![Screenshot](scr_pa.jpg)

How to
------
Click the button to get a conditioning exercise.


Advanced how to
---------------
Click the sets button to change some settings.
* Keep track of how many sets have been completed, and reset counter when starting over.
* Do you want to see what the dice are named?

Click the setup button to change some other settings.
* Which presets do you want to choose from on the front page?
* Which dice should those presets contain
* What messages are on those dice?


Why?
---
It is not as fun as actually rolling dice - but it is faster and a bit more clear, and thus somewhat more effective when coaching larger groups. 


TODO
----
* How to best move a configuration from a computer to a mobile browser? or vice-verse?
* Fix preset setup, it is kinda ugly right now. Dont just remove the last in the list on setup page?
* add background image to first page and the rest of the styling Viktor wants.
* Trigger refresh when reset button is pushed

* Jag vill att båda knapparna är "fejdade" när man har fått fram listan. /Vktr
* Jag vill att listan "rullar/glider" ner från knappen? /Vktr
* FIXD: Tärningsresultat nu i löpande text /Peter
	*Kanske ändra formuleringen. Så att man får svaret "30 st Pushups of Doom - (gör dem långsamt)"
	(Vid tillfällen då man ska x antal meter. Kan man fixa så att det står t.ex. 20m (fastän det egentligen är 10 gånger 0.5m)
	* det gör vi isf i tärningarnas setup. byt första tärningen till att vara bara siffror, andra till "st pushups" eller "m monkey walk", och sista är "of doom - (etc)"
* FIXD: Style enbart på första sidan /peter <- Förstörde allting igen.
* Blått "glow" kring knapparna på #setup (FIXADE SJÄLV)
* Ändra så att när man byter "skärm" så ska inte .ui-header och .ui-bar-inherit "fejda"
* Jag lyckas inte få till det så att man kan se vilken som är markerad under #setup. Just nu så 
får den "nedtryckta" knappen samma attribut (element?) som knapparna (anchors?) i footern. Jag kan inte få .ui-btn-b att ändras.

* Sudda inte ut titeln på sidorna, byt istället färg på texten till transparent, like so:

    #main .ui-title {
      color: transparent;
    }

Credits/Thanks
--------------
* Martin, Viktor, & [Parkour Academy](http://www.parkouracademy.se)
* Andy Pearson [lonetraceur](http://instagram.com/lonetraceur?modal=true)
* [knockout js](https://knockoutjs.com)
* [jQuery](http://jquery.com/) & [jQuery mobile](http://jquerymobile.com/)
