import React, { useContext, useEffect } from "react";
import "../tutorial/tutorial.css";
import HudContext from "../../contexts/HudContext";
import Layout from "../../components/layout/Layout";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Component } from "react";
import { Subject, switchMap, take, tap, timer } from "rxjs";

export default function Tutorial() {
  const { setIsHudDisplayed } = useContext(HudContext);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  const slotClick = () => {
    setModalShow(true);
  };

  return (
    <Layout navigations={[]} title="Útmutató">
      <SlotGame show={modalShow} onHide={() => setModalShow(false)} />
      <div className="container-fluid">
        <div className="information justify-content-center">
          <span>
            <h4 className="text-center text-warning">Rövid ismertető</h4>
            <p>
              A játék lényege, hogy fejleszd a szigetedet. A fejlesztéshez
              szükséges alapanyagokat más szigetekkel való cserével, csatával,
              vagy a saját szigeteden indított expedícióval és a szigetedre már
              letelepített épületekből termelődő alapanyagokból tudod
              beszerezni. A szükséges tapasztalati pontokat az expedíciókkal és
              csatákkal tudod összegyűjteni a fejlődéshez. Szintlépésenként
              kapsz 3 tapasztalati pontot, amelyeket a szigeted alap pontjaihoz
              tudsz hozzáadni, ezáltal növelheted a különböző tulajdonságait a
              szigetednek. Ezeket alul részletezünk. Amennyiben szükséges
              menetközben a gyors információ, a kérdőjel ikonora kattintva
              tudhatsz meg többet.
            </p>

            <h4 className="text-center text-warning">Szigetek</h4>
            <p>
              Négy alap sziget van a játékban: Európai, japán, viking és indián.
              Mindegyikük más alapstatisztikával rendelkezik és más alapanyag
              követelményekkel a fejlődéshez.
            </p>

            <h4 className="text-center text-warning">A játék négy fő része</h4>
            <br></br>
            <p>
              - Expedíció a saját szigeten,<br></br>- Csata más szigetek ellen,
              <br></br>- Szigetek közötti cserekereskedelem,<br></br>- Fő
              épületek építése és fejlesztése.<br></br>
            </p>

            <h4 className="text-center text-warning">Az expedíció</h4>
            <p>
              Az expedíciót már a játék elején el tudod indítani. Két expedíció
              között 1 perc várakozási ídő van, ezalatt nem indíthatsz újat. Az
              expedíció sikerességének eredményét,a begyűjtött alapanyagokkal
              együtt azonnal megkapod. Három nehézségi fokozat közül
              választhatsz, természetesen a legkönnyebb adja a legkevesebb
              anyagot és tapasztalati pontot, a legnehezebb a legtöbbet. A
              sikerességük kimenetele úgyanígy a nehézségtől függően változik.
              Az ötös szintig ez az egyetlen lehetőség az xp gyűjtésére a
              szintlépésekhez. Az expedíción kapott nyersanyagot befolyásolja
              még az intelligencia mennyisége is.
            </p>

            <h4 className="text-center text-warning">A csata</h4>
            <p>
              Csatázni ötödik szint elérése után lesz lehetőséged.
              Véletlenszerűen kisorsolt ellenfeleket dob fel a játék és azokat
              tudod majd megtámadni. Próbál a rendszer a te szintednek megfelelő
              ellenfél szigeteket adni, hogy ne legyen túl nagy különbség a
              csaták során. A csatákat befolyásolják az alábbi tényezők: templom
              szint, kiképző szint, ügyesség / erő / intelligencia mennyisége.
              Alul pontosabb információkat kaphatsz róla, valamint az adott
              menüben (fejlesztésnél, építésnél és tapasztalati pontnál) a
              kérdőjel gombra kattintva több információhoz juthatsz.
            </p>

            <h4 className="text-center text-warning">A kereskedelem</h4>
            <p>
              A kereskedelem a többi szigettel a piac menüpont alatt zajlik. Itt
              tudsz felrakni saját csere ajánlatokat, illetve tudod törölni, ha
              meggondolod magadat. A levonás csak a cserék elfogadása után
              történik, nem kell félned attól, hogy levonódik, amit kiraktál
              alapanyag. Valamint a többi sziget által kirakott portékát is
              megtekintheted, böngészheted kedved szerint.
            </p>

            <h4 className="text-center text-warning">Fejlesztés és építés</h4>
            <p>
              Öt alap épületet tudsz lerakni és azokat tudod fejleszteni.
              Mindegyiknek megvan a sziget fajtájától függően az alapanyag
              követelmény a megépítéshez és fejlesztéshez. Természetesen több
              anyag szükséges a második és harmadik szintre való fejlesztés,
              mint az első szint megépítése. Te magad döntöd el, hogy hova rakod
              le az adott épületet és hogy milyen sorrendben. Mindegyik épület
              termel passzívan alapanyagot és megépítéskor / fejlesztéskor ad
              egy kevés XP-t.
              <br></br>
              <br></br>
              <span className="text-warning">Az öt alap épület:</span>
              <br></br>- <b>Templom:</b> <br></br>
              Passzívan pénzt termel. Csatában plusz sebzést okoz százalékos
              arányban. Szinttől függően több a sebzés és a termelt pénz
              mennyisége.
              <br></br>- <b>Kiképző:</b> <br></br>
              Passzívan pénzt termel. Csatában a kritikus találat sebzését
              növeli. Szinttől függően több a sebzés kritikus támadás esetén és
              a termelt pénz mennyisége.
              <br></br>- <b>Fa termelő:</b> <br></br>
              Passzívan fát termel. Szinttől függően több a termelt fa
              mennyisége.
              <br></br>- <b>Kő termelő:</b> <br></br>
              Passzívan követ termel. Szinttől függően több a termelt kő
              mennyisége.
              <br></br>- <b>Vas termelő:</b> <br></br>
              Passzívan vasat termel. Szinttől függően több a termelt vas
              mennyisége.
              <br></br>
            </p>

            <h4 className="text-center text-warning">Képességek</h4>
            <p>
              A képességek elég fontos szerepet töltenek be a szigetek életében.
              Csatában sokkal nagyobb sebzéshez juthatsz, illetve több anyagot
              szerezhetsz általuk. Van maximum értékük, így nem rakhatsz minden
              pontot egy ágra.
              <br></br>
              <br></br>- Erő: <br></br>
              <p>Növeli a bevitt sebzés mértékét.</p>- Ügyesség: <br></br>
              <p>Növeli a kritkus találat esélyét.</p>- Intelligencia: <br></br>
              <p>
                Növeli a sikeres expedíció és csata utáni alapanyag és xp
                mennyiségét.
              </p>
            </p>

            <h4 className="text-center text-warning">Alapanyagok</h4>
            <p>
              Három fő alapanyag van és mellette van még XP és pénz. A pénz, fa,
              kő és vas szükséges az épületek megépítéséhez és fejlesztéséhez.
              Az XP pedig a sziget össz szintjének növeléséhez, amely plusz
              pontokat ad a képességekhez.
            </p>

            <h4 className="text-center text-warning">Végszó</h4>
            <p>
              Reméljük élvezni fogod a játékot. Amennyiben kérdés merülne fel,
              mely nem került megválaszolásra az alábbi email címeken üzenhetsz
              nekünk:
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
  "../images/makers/LeknerNorbert.jpg",
  "../images/makers/MészárosBalázs.jpg",
  "../images/makers/SzigiliEdit.jpg",
  "../images/profile_pictures/viking_profile.png",
  "../images/profile_pictures/indian_profile.png",
  "../images/profile_pictures/europian_profile.png",
];

class SlotGame extends Component {
  constructor(props) {
    super(props);

    this.ITEMS = [
      "../images/makers/LeknerNorbert.jpg",
      "../images/makers/MészárosBalázs.jpg",
      "../images/makers/SzigiliEdit.jpg",
    ];

    this.state = {
      firstSlot: this.ITEMS[0],
      secondSlot: this.ITEMS[1],
      thirdSlot: this.ITEMS[2],
      result: 0,
      isFinished: false,
    };

    this.imgPath = [
      "../images/slot/slot_lose.png",
      "../images/slot/slot_win.png",
      "../images/slot/slot_jackpot.png",
    ];

    this.spins$ = new Subject();
  }

  setSlots(firstSlot, secondSlot, thirdSlot) {
    this.setState((state) => ({
      ...state,
      firstSlot: firstSlot,
      secondSlot: secondSlot,
      thirdSlot: thirdSlot,
    }));
  }

  setResult(result) {
    this.setState((state) => ({
      ...state,
      result: result,
    }));
  }

  setIsFinished(isFinished) {
    this.setState((state) => ({
      ...state,
      isFinished: isFinished,
    }));
  }

  gameCost() {
    console.log("Levonás");
    axios
      .put("https://localhost:7276/api/Player/CollectRewards", {
        coins: -10,
        woods: 0,
        stones: 0,
        irons: 0,
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  winPost() {
    console.log("Hozzáadás");
    axios
      .put("https://localhost:7276/api/Player/CollectRewards", {
        coins: 20,
        woods: 0,
        stones: 0,
        irons: 0,
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  jackpotPost() {
    console.log("Jackpot");
    axios
      .put("https://localhost:7276/api/Player/CollectRewards", {
        coins: 20,
        woods: 10,
        stones: 10,
        irons: 10,
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  spin(isLast) {
    const newSlot1 =
      SLOT_VALUES[Math.floor(Math.random() * SLOT_VALUES.length)];
    const newSlot2 =
      SLOT_VALUES[Math.floor(Math.random() * SLOT_VALUES.length)];
    const newSlot3 =
      SLOT_VALUES[Math.floor(Math.random() * SLOT_VALUES.length)];
    this.setSlots(newSlot1, newSlot2, newSlot3);

    if (!isLast) return;
    this.setIsFinished(true);

    if (newSlot1 === newSlot2 && newSlot2 === newSlot3) {
      this.setResult(2);
      this.jackpotPost();
    } else if (
      newSlot1 === newSlot2 ||
      newSlot2 === newSlot3 ||
      newSlot1 === newSlot3
    ) {
      this.setResult(1);
      this.winPost();
    } else {
      this.setResult(0);
    }
  }

  componentDidMount() {
    this.spins$
      .pipe(
        tap(() => this.setIsFinished(false)),
        switchMap(() => timer(0, 200).pipe(take(10)))
      )
      .subscribe((count) => {
        this.spin(count === 9);
      });
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="modal-game-container">
          <Modal.Body>
            <div className="">
              <div className="winnings-img text-center">
                {this.state.isFinished ? (
                  <img
                    src={this.imgPath[this.state.result]}
                    alt="eredmény"
                  ></img>
                ) : null}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="slot-machine d-flex justify-content-center align-items-center">
                  <div className="slotbg">
                    <img src={this.state.firstSlot} alt="slot1"></img>
                  </div>
                  <div className="slotbg p-5">
                    <img src={this.state.secondSlot} alt="slot2"></img>
                  </div>
                  <div className="slotbg">
                    <img src={this.state.thirdSlot} alt="slot3"></img>
                  </div>
                </div>
              </div>
              <div className="result-container d-flex justify-content-center">
                <button
                  className="slot-btn"
                  onClick={() => {
                    this.spins$.next();
                    this.gameCost();
                  }}
                ></button>
                <button
                  className="close-slot-btn font-btn"
                  onClick={this.props.onHide}
                >
                  Bezárás
                </button>
              </div>
            </div>
            <div className="text-center text-warning pt-1">
              <span>10 Coin / pörgetés</span>
              <br></br>
              <span>Vesztésnél: 0 loot | Nyerésnél: 20 coin</span>
              <br></br>
              <span>Jackpot esetén 10db minden anyagból</span>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    );
  }
}
