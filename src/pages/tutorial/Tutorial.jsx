import React, { useContext, useEffect, useState } from "react";
import "../tutorial/tutorial.css";
import HudContext from "../../contexts/HudContext";
import Layout from "../../components/layout/Layout";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { ModalFooter } from "react-bootstrap";

export default function Tutorial() {
  const { setIsHudDisplayed } = useContext(HudContext);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  const slotClick = () =>{
    setModalShow(true)
  }


  return (
    <Layout navigations={[]} title="Útmutató">
      <SlotGame
          show={modalShow}
          onHide={() => setModalShow(false)}
      />
      <div className="container-fluid">
        <div className="information justify-content-center">
          <span>
            <h4 className='text-center text-warning'>Rövid ismertető</h4>
            <p>
              A játék lényege, hogy fejleszd a szigetedet. A fejlesztéshez szükséges alapanyagokat más szigetekkel való cserével, csatával vagy saját szigeten
              indított expedícióval tudod beszerezni. Illetve a szükséges tapasztalati pontokat is az utóbbiakkal tudod beszerezni a fejlődéshez. Szintlépésenként
              kapsz 3 tapasztalati pontot, amelyet a szigeted alap pontjaihoz tudsz hozzáadni. Ezáltal nőnek különböző tulajdonságok, amelyeket alul részletezünk.
              Amennyiben szükséges gyors információ, akkor a kérdőjel ikonos gombokra kattintva tudhatsz meg többet.
            </p>

            <h4 className='text-center text-warning'>Szigetek</h4>
            <p>
              Négy alap sziget van a játékban: Európai, japán, viking és indián. Mindegyikük más alapstatisztikával rendelkezik és más alapanyag követelményekkel.
            </p>

            <h4 className='text-center text-warning'>A játék négy fő része</h4><br></br>
            <p>- Expedíció a saját szigeten,<br></br>
              - Csata más szigetek ellen,<br></br>
              - Szigetek közötti cserekereskedelem,<br></br>
              - Fő épületek építése és fejlesztése.<br></br>
            </p>

            <h4 className='text-center text-warning'>Az expedíció</h4>
            <p>
              Expedíciót már a játék legelején tudsz indítani. 10 percenként lehet egy expedíciót elindítani, de eredményt az indításkor megkapod. Jelenleg
              nincs a gyorsításra lehetőség. Három nehézségi fokozat közül választhatsz, természetesen a legkönyebb adja a legkevesebb anyagot és tapasztalati
              pontot és a legnehezebb a legtöbbet. Ötös szintig az egyetlen lehetőség a cserén kívül, arra, hogy alapanyagot szerezz. Az expedíción kapott nyersanyagot
              befolyásolja még az intelligencia mennyisége is. 
            </p>

            <h4 className='text-center text-warning'>A csata</h4>
            <p>
              Csatázni ötödik szint elérése után lesz lehetőséged. Véletlenszerűen kisorsolt ellenfeleket dob fel a játék és azokat tudod majd megtámadni. 
              Próbál a rendszer a te szintednek megfelelő ellenfél szigeteket adni, hogy ne legyen túl nagy különbség a csaták során. A csatákat befolyásolják 
              az alábbi tényezők: templom szint, kiképző szint, ügyesség / erő / intelligencia mennyisége. Alul pontosabb információkat kaphatsz róla, valamint
              az adott menüben (fejlesztésnél, építésnél és tapasztalati pontnál) a kérdőjel gombra kattintva több információhoz juthatsz.
            </p>

            <h4 className='text-center text-warning'>A kereskedelem</h4>
            <p>
              A kereskedelem a többi szigettel a piac menüpont alatt zajlik. Itt tudsz felrakni saját csere ajánlatokat, illetve tudod törölni, ha meggondolod magadat.
              A levonás csak a cserék elfogadása után történik, nem kell félned attól, hogy levonódik, amit kiraktál alapanyag.
              Valamint a többi sziget által kirakott portékát is megtekintheted, böngészheted kedved szerint.
            </p>

            <h4 className='text-center text-warning'>Fejlesztés és építés</h4>
            <p>
              Öt alap épületet tudsz lerakni és azokat tudod fejleszteni. Mindegyiknek megvan a sziget fajtájától függően az alapanyag követelmény a megépítéshez és fejlesztéshez.
              Természetesen több anyag szükséges a második és harmadik szintre való fejlesztés, mint az első szint megépítése. Te magad döntöd el, hogy hova rakod le az adott
              épületet és hogy milyen sorrendben. Mindegyik épület termel passzívan alapanyagot és megépítéskor / fejlesztéskor ad egy kevés XP-t.  
              <br></br><br></br>
              <span className="text-warning">Az öt alap épület:</span>
              <br></br>
              - <b>Templom:</b> <br></br>
                  Passzívan pénzt termel.
                  Csatában plusz sebzést okoz százalékos arányban.
                  Szinttől függően több a sebzés és a termelt pénz mennyisége.
                  <br></br>
              - <b>Kiképző:</b> <br></br>
                  Passzívan pénzt termel.
                  Csatában a kritikus találat sebézését növeli.
                  Szinttől függően több a sebéz kritikus támadás esetén és a termelt pénz mennyisége.
                  <br></br>
              - <b>Fa termelő:</b> <br></br>
                  Passzívan fát termel.
                  Szinttől függően több a termelt fa mennyisége.
                  <br></br>
              - <b>Kő termelő:</b> <br></br>
                  Passzívan követ termel.
                  Szinttől függően több a termelt kő mennyisége.
                  <br></br>
              - <b>Vas termelő:</b> <br></br>  
                  Passzívan vasat termel.
                  Szinttől függően több a termelt vas mennyisége.
                  <br></br>
            </p>

            <h4 className='text-center text-warning'>Képességek</h4>
            <p>
              A képességek elég fontos szerepet töltenek be a szigetek életében. Csatában sokkal nagyobb sebzéshez juthatsz, illetve több anyagot szerezhetsz 
              általuk. Van maximum értékük, így nem rakhatsz minden pontot egy ágra. 
              <br></br>
              <br></br>
              - Erő: <br></br>
              <p>
                Növeli a bevitt sebzés mértékét.
              </p>
              - Ügyesség: <br></br>
              <p>
                Növeli a kritkus találat esélyét.
              </p>
              - Intelligencia: <br></br>
              <p>
                Növeli a sikeres expedíció és csata utáni alapanyag és xp mennyiségét.
              </p>
            </p>

            <h4 className='text-center text-warning'>Alapanyagok</h4>
            <p>
              Három fő alapanyag van és mellette van még XP és pénz.
              A pénz, fa, kő és vas szükséges az épületek megépítéséhez és fejlesztéséhez.
              Az XP pedig a sziget össz szintjének növeléséhez, amely plusz pontokat ad a képességekhez.
            </p>

            <h4 className="text-center text-warning">Végszó</h4>
            <p>
              Reméljük élvezni fogod a játékot. Amennyiben kérdés merülne fel, mely nem került megválaszolásra az alábbi email címeken üzenhetsz nekünk:
            </p>
          </span>
          <div className="makers d-flex justify-content-evenly">
            <div>
              <img
                src="../images/makers/MészárosBalázs.jpg"
                className="card-img-fluid"
                alt="Balázs"
                title="Mészáros Balázs"
                onClick={slotClick}
              ></img>
              <div className="tcard-body">
                <h5 className="tcard-title">Fejlesztő</h5>
                <h6 className="tcard-name">Mészáros Balázs</h6>
                <p className="tcard-text">
                  <a href="mailto:meszarosb1@kkszki.hu">meszarosb1@kkszki.hu</a>
                </p>
              </div>
            </div>
            <div>
              <img
                src="../images/makers/LeknerNorbert.jpg"
                className="card-img-fluid"
                alt="Norbert"
                title="Lekner Norbert"
              ></img>
              <div className="tcard-body">
                <h5 className="tcard-title">Fejlesztő</h5>
                <h6 className="tcard-name">Lekner Norbert</h6>
                <p className="tcard-text">
                  <a href="mailto:leknern@kkszki.hu">leknern@kkszki.hu</a>
                </p>
              </div>
            </div>
            <div>
              <img
                src="../images/makers/SzigiliEdit.jpg"
                className="card-img-fluid"
                alt="Edit"
                title="Szigili Edit"
              ></img>
              <div className="tcard-body">
                <h5 className="tcard-title">Fejlesztő</h5>
                <h6 className="tcard-name">Szigili Edit</h6>
                <p className="tcard-text">
                  <a href="mailto:szigilie@kkszki.hu">szigilie@kkszki.hu</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
const SLOT_VALUES = [
  '../images/makers/LeknerNorbert.jpg', 
  '../images/makers/MészárosBalázs.jpg', 
  '../images/makers/SzigiliEdit.jpg', 
  '../images/profile_pictures/viking_profile.png', 
  '../images/profile_pictures/indian_profile.png', 
  '../images/profile_pictures/europian_profile.png'];

function SlotGame(props) {
      const [slot1, setSlot1] = useState('../images/makers/LeknerNorbert.jpg');
      const [slot2, setSlot2] = useState('../images/makers/MészárosBalázs.jpg');
      const [slot3, setSlot3] = useState('../images/makers/SzigiliEdit.jpg');
      const [result, setResult] = useState(0);

      const imgPath = 
      [
        '../images/slot/slot_lose.png',
        '../images/slot/slot_win.png',
        '../images/slot/slot_jackpot.png'
      ]
    function spin() {
      const newSlot1 = SLOT_VALUES[Math.floor(Math.random() * SLOT_VALUES.length)];
      const newSlot2 = SLOT_VALUES[Math.floor(Math.random() * SLOT_VALUES.length)];
      const newSlot3 = SLOT_VALUES[Math.floor(Math.random() * SLOT_VALUES.length)];
      setSlot1(newSlot1);
      setSlot2(newSlot2);
      setSlot3(newSlot3);
      if (newSlot1 === newSlot2 && newSlot2 === newSlot3) {
        setResult(2);
      } else if (newSlot1 === newSlot2 || newSlot2 === newSlot3 || newSlot1 === newSlot3) {
        setResult(1);
      } else {
        setResult(0);
      }
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-game-container">
        <Modal.Body>
            <div className="">
              <div className="winnings-img text-center">
                <img src={imgPath[result]}></img>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="slot-machine d-flex justify-content-center align-items-center">
                  <div className="slotbg">
                    <img src={slot1}></img>
                  </div>
                  <div className="slotbg p-5">
                    <img src={slot2}></img>
                  </div>
                  <div className="slotbg">
                    <img src={slot3}></img> 
                  </div>
                </div>  
              </div>
              <div className="result-container d-flex justify-content-center">
                <button className="slot-btn" onClick={spin}></button>
                <button className="close-slot-btn" onClick={props.onHide}>Bezárás</button>
              </div>
            </div>
            <div className="text-center text-warning pt-1">
              <span>10 Coin / pörgetés</span><br></br>
              <span>Vesztésnél: 0 loot | Nyerésnél: 20 coin</span><br></br>
              <span>Jackpot esetén 10db minden anyagból</span>
            </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}