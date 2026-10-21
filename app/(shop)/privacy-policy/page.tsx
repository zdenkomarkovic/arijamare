import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  url: '/privacy-policy/',
})

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
      <h1 className="text-3xl font-semibold mb-8 font-serif">Privacy Policy</h1>
      <div className="page-content max-w-4xl">
        <p>Dobrodošli na web stranicu www.arijamare.com. Molimo pročitajte pravila i uslove korišćenja u nastavku. Pristupom ili upotrebom naše internet stranice, potvrđujete da ste pročitali, razumeli i da se slažete sa svim uslovima i pravilima korišćenja ovog sajta.</p>
        <p>Arijamare, kao autor/vlasnik/menadžer sajta www.Arijamare.com u daljem tekstu Arijamare.com zadržava pravo izmene i dopune sadržaja ovog sajta, što uključuje i Izjavu o privatnosti i Pravila i Uslove korišćenja, u bilo kom trenutku, bez prethodne najave. Stoga Vas molimo da redovno posećujete ovu stranicu, kako biste bili u toku sa izmenama Pravila i Uslova korišćenja koje ste prihvatili.</p>
        <h2>Politika u vezi sa vraćanjem robe i povraćajem novca za poručene proizvode</h2>
        <p>Proizvodi koji ne odgovaraju specifikacijama navedenim u ponudi / opisu proizvoda mogu se vratiti jedino Ponuđaču / Prodavcu, uz navedene informacije o prirodi i stepenu nepoklapanja sa specifikacijama. Troškove transporta snosi Korisnik / Kupac, osim ukoliko u opisu ponude nije navedeno drugačije.www.Arijamare.com neće ni u kom slučaju snositi troškove transporta proizvoda kupljenih na sajtu.</p>
        <h2>Autorska prava</h2>
        <p>Korpica doo je autor Sajta i poseduje sva zagarantovana prava u tom svojstvu, u skladu sa domaćim i međunarodnim zakonima. Ukoliko nije drugačije naznačeno, svi materijali, uključujući ilustracije, slike, dizajn, ikonice, fotografije, audio/video klipove itd. su vlasništvo Arijamare.com</p>
        <p>Sadržaj Sajta (tekstovi, opisi proizvoda i usluga, tehničke karakteristike, slike, simboli) su u vlasništvu Arijamare.com i proizvođača ili distributera ponuđenih proizvoda i usluga, pa Korpica ne preuzima odgovornost za sadržaj opisa proizvoda objavljenog na Sajtu.</p>
        <p>Ako preuzimate softver sa ovog Sajta, uključujući i dokumenta i slike koje taj softver sadrži ili ih je generisao, kao i prateće podatke (u daljem tekstu Softver), smatrajte da je licenciran od strane Korpica shop doo (u daljem tekstu Autor). Autor ima puno pravo na Softver i sva prava intelektualnog vlasništva koja iz toga proizlaze. Ne smete prodavati, distribuirati, reprodukovati ili dekompilirati Softver. Svi zaštitni znakovi i logotipi su u vlasništvu Autora ili nosioca dozvole i nemate dozvolu da ih kopirate, ili koristite na bilo koji način.</p>
        <p>Korpica je registrovani žig u vlasništvu Arijamare Internet domen Arijamare.comje u vlasništvu. Upotreba žiga ili domena, otvoreno ili skriveno (kao što su, ali ne isključivo, meta tagovi i druge tehnike indeksiranja, pretraživanja weba), bez prethodne pismene saglasnosti Korpica doo je zabranjeno i kažnjivo zakonom.</p>
        <h2>Linkovi ka drugim sajtovima</h2>
        <p>Autor ne preuzima odgovornost za sadržaj sajtova van svoje mreže. Kada pristupite sajtu koji ne pripada Korpica mreži, imajte u vidu da je to nezavisan sajt i da Autor nema kontrolu nad njegovim sadžajem. Link ka sajtu van mreže sajtova Autora ne podrazumeva da Autor prihvata odgovornost za sadržaj tog sajta. Odgovornost za tačnost informacija u potpunosti pripada pružaocu ponuđenih usluga i proizvoda.</p>
        <h2>Prava i obaveze</h2>
        <p>Zabranjena je trgovina, kopiranje ili falsifikovanje Vaučera.</p>
        <p>Korisnik je saglasan da od sajta Arijamare.com prima komercijalne poruke u vezi prodaje robe/usluga putem veb sajta uz pravo da u svakom trenutku povuče saglasnost tako što će obavestiti sajt Arijamare.com pismenim putem.</p>
        <p>Sajt www.korpica.rs zadržava pravo da ponudi specijalnu ponudu po posebnim uslovima u okviru redovne ponude.</p>
        <h2>Jednostrani raskid</h2>
        <p>U slučaju jednostranog raskida možete nas kontaktirati putem kontakt forme ili telefonom.</p>
        <p>Kupac ima pravo da u roku od 14 dana od dana zaključenja ugovora o kupovini proizvoda bez navođenja razloga jednostrano raskine ugovor. Jednostranim raskidom kupac se oslobađa svih ugovornih obaveza, osim neposrednih troškova povraćaja robe. Kupac gubi pravo na jednostrani raskid ako uz izričitu saglasnost potrošača, ukoliko roba bude oštećena.</p>
        <h2>Informacije za posetioce Sajta</h2>
        <p>Usluge Korpice namenjene su isključivo fizičkim licima. Web sajt mogu koristiti fizička lica starosti 18 godina i preko. Lica starosti između 16 i 18 godina mogu koristiti sajt jedino uz saglasnost roditelja ili staratelja koji se moraju složiti sa važećim pravilima i uslovima korišćenja sajta. Lica mlađa od 16 godina ne mogu koristiti sajt.</p>
        <p>Kao korisnik potvrđujete da razumete i prihvatate sledeće odgovornosti:</p>
        <p>Da ćete dostaviti istinite, tačne i potpune informacije o sebi, u skladu sa zahtevima formulara za registraciju; Da ćete blagovremeno vršiti izmene podataka kako bi bili istiniti, tačni i kompletni.</p>
        <p>Takođe se obavezujete da nećete činiti sledeće:</p>
        <p>Postavljati materijal koji sadrži viruse i druge programe namenjene oštećenju ili uništenju ovog Sajta ili baze podataka; Objavljivati materijal zaštićen autorskim pravima, ukoliko niste autor istog ili imate pravo na njegovo korišćenje; Postavljati opscen, klevetnički, preteći ili zlonamerni materijal na štetu drugog korisnika, osobe ili pravnog lica, materijale ili informacije zabranjene zakonom; Postavljati slike ili izjave koje nisu u skladu sa zakonom.</p>
        <p>Popunjavanjem formulara za registraciju iz kog će Autor preuzeti vaše podatke u svrhu učešća u različitim aktivnostima (informisanje, promocija, reklama, zabava), podrazumeva se da pristajete na sledeće:</p>
        <ol>
          <li>Da će ove podatke prikupiti, uskladištiti i obraditi Arijamare.com;</li>
          <li>Da će se podaci koristiti neograničen period vremena i za naknadne kontakte;</li>
          <li>Da primate od Arijamare.com različite materijale, informacije, predloge i pozivnice za učešće u različitim aktivnostima, o različitim proizvodima i/ili uzorcima proizvoda, putem email obaveštenja sa servisnim informacijama. Svaka email poruka sa ovakvim sadržajem, sadrži i uputstvo za odjavu.</li>
        </ol>
        <h2>Garancija</h2>
        <p>Autor ne garantuje da sajt, serveri na kome se hostuje ili email poruke od Arijamare.com ne sadrže računarske viruse ili drugi potencijalno škodljiv softver. Posetilac koristi Arijamare.comna sopstveni rizik, a Korpica shop doo ne preuzima odgovornost za eventualnu štetu, direktnu ili indirektnu, nastalu korišćenjem/posećivanjem Sajta ili informacija sadržanih na njemu. Informacije na sajtu oslikavaju stvarnost u trenutku registracije ili osvežavanja pojedinih stranica. Autor ne snosi odgovornost za kvalitet usluga ponuđenih na Sajtu.</p>
        <h2>Sigurnost</h2>
        <p>Prilikom korišćenja Sajta, korisnik je sam odgovoran za zaštitu podataka koji omogućavaju pristup nalogu, poput korisničkog imena i lozinke, a takođe snosi odgovornost za postupke na sajtu dok je u svom nalogu. Ukoliko smatrate da je poverljivost vaših podataka za pristup nalogu ugrožena iz bilo kojih razloga, odmah obavestite Arijamare.com o tome, kako bismo blokirali pristup vašem nalogu i generisali nove pristupne podatke.</p>
        <p>Neovlašćene transakcije na ovom Sajtu i pokušaj istih, koje uključuju, ali se ne ograničavaju na: zloupotrebe, prevare iz koristi, neovlašćeni pristupa, izmenu i kopiranje podataka u svrhu njihove komercijalizacije, blokiranje pristupa, itd. biće kažnjene u skladu sa zakonom.</p>
        <h2>Komunikacija</h2>
        <p>Korisnici sajta mogu uredništvu dostavljati pitanja, komentare, beleške, predloge i ideje u vezi sa sadržajem Sajta, sve dok nisu nezakonite, opscene, klevetničke, preteće i ne ugrožavaju privatnost i autorska prava Arijamare.com ili treće strane, ako ne sadrže viruse, nisu deo političke/predizborne kampanje, lančana pisma, masovna pošta ili neki drugi vid neželjene pošte / Spam-a. Ne smete koristiti lažnu email adresu ili predstavljati drugu osobu ili entitet. Arijamare.com zadržava pravo, ali ne i obavezu, da ukloni ili izmeni takve informacije.</p>
        <h2>Izmene pravila i uslova korišćenja</h2>
        <p>Ukoliko budemo smatrali da je potrebno izmeniti pravila i uslove korišćenja, objavićemo te promene na ovoj strani.</p>
      </div>
    </main>
  )
}
