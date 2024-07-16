import React, { useState, useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {
  dakor,
  Arvindbhai,
  ASHVINBHAI_PHOTO,
  BALMUKUNDBHAI_PHOTO,
  BHADRESHBHAI_PHOTO,
  BHILALBHAI_PHOTO,
  CHIRAG,
  DIPAKBHAI,
  DR_DIPAKBHAI_PHOTO,
  GANPATBHAI,
  HASMUKHBHAI_PHOTO,
  HEEMANT_PHOTO,
  HIMMATBHAI_PHOTO,
  HITEN_PHOTO,
  JAGDISHBHAI,
  JYNTIBHAI,
  JYOTINDRABHAI_PHOTO,
  MANOJBHAI_PHOTO,
  MUKUNDBHAI,
  NARESHKUMAR_PHOTO,
  NIMESH,
  PINAKINBHAI_PHOTO,
  PRADIPBHAI_PHOTO,
  RAJNIKANTBHAI,
  RAJNIBHAI,
  RAMANBHAI_PANCHAL,
  RAMESHBHAI_GAJJAR,
  RAMESHBHAI_PHOTO,
  SANATBHAI_PHOTO,
  SURESHBHAI_PHOTO,
  VIPUL_PHOTO,
  SARADBHAI,
  CL,
} from "../../assets";
import { apiConfig } from "../../Services/GlobalApi";

const Trustees = () => {
  const [trustees, setTrustees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const staticTrustees = [
    {
      trustee_image: NIMESH,
      trustee_title: "પ્રમુખશ્રી",
      trustee_name: "નિમેશકુમાર વિષ્ણુભાઈ સુથાર",
      trustee_description:
        '"વિશ્વકર્મા કૃપા" ૮, માનસી લેન્ડમાર્ક, બાકરોલ રોડ, મુ. બાકરોલ',
      trustee_mobileNo: "મો. ૯૮ર૪પ ૩૫૦૫૩",
    },
    {
      trustee_image: MUKUNDBHAI,
      trustee_title: "ઉપપ્રમુખશ્રી",
      trustee_name: "મુકુંદભાઈ વાઘજીભાઈ મિસ્ત્રી",
      trustee_description:
        '"ઓમ શાંતિ" બી-૪, ચૈતન્ય વિહાર, દેના પરિવાર પાછળ, એકતા પરિવાર પાસે, વિદ્યાનગર રોડ, મુ. આણંદ',
      trustee_mobileNo: "મો. ૯૦૯૯૦ ૧૮૯૮૨",
    },
    {
      trustee_image: JYNTIBHAI,
      trustee_title: "મંત્રીશ્રી",
      trustee_name: "જયંતીભાઈ મંગળભાઈ સુથાર",
      trustee_description:
        "૧૭, તિરૂપતિ એવન્યુ, જય અંબે એવન્યુ, સુંદલપુરા રોડ, પટેલ વાડી પાસે, મુ. ઉમરેઠ, જી. આણંદ",
      trustee_mobileNo: "મો. ૯૩૨૭૩ ૯૭૧૮૮",
    },
    {
      trustee_image: VIPUL_PHOTO,
      trustee_title: "સહમંત્રીશ્રી",
      trustee_name: "વિપુલભાઈ અશોકભાઈ ગજ્જર",
      trustee_description:
        "સુથાર ફળિયું, અંબાજી મંદિર પાસે, મુ. ખાનકુવા, જી. આણંદ",
      trustee_mobileNo: "મો. ૯૭૧૪૮ ૬૯૨૧૧",
    },
    {
      trustee_image: DR_DIPAKBHAI_PHOTO,
      trustee_title: "ખજાનચીશ્રી",
      trustee_name: "ડૉ. દીપકભાઈ જનકભાઈ સુથાર",
      trustee_description: "પંચાલ ફળિયું, મુ. વિરણીયા, જી. મહીસાગર",
      trustee_mobileNo: "મો. ૯૯૦૯૬ ૧૦૯૯૬",
    },
    {
      trustee_image: PINAKINBHAI_PHOTO,
      trustee_title: "સહખજાનચીશ્રી",
      trustee_name: "પિનાકીનભાઈ ભાઈલાલભાઈ મિસ્ત્રી",
      trustee_description: "નાગરવાડા, મુ. મહુધા, જી. ખેડા",
      trustee_mobileNo: "મો. ૭૮૭૪૬ ૨૮૮૧૦",
    },
    {
      trustee_image: BHILALBHAI_PHOTO,
      trustee_title: "ઓડીટરશ્રી",
      trustee_name: "ભાઈલાલભાઈ ઈશ્વરભાઈ પંચાલ",
      trustee_description:
        '"નિરાંત", ૪૪ ઋતુ બંગ્લોઝ, અનમોલ બંગ્લોઝની સામે, કમુબા પાર્ટી પ્લોટની પાસે, ન્યુ રાણીપ, અમદાવાદ',
      trustee_mobileNo: "મો. ૯૮૨૫૪ ૫૮૩૨૭",
    },
    {
      trustee_image: HEEMANT_PHOTO,
      trustee_title: "સહઓડીટરશ્રી",
      trustee_name: "હેમંતકુમાર કનૈયાલાલ પંચાલ",
      trustee_description:
        "સી-૪, શિવમ એપાર્ટમેન્ટ, પ્રાઈમ એપાર્ટમેન્ટ સામે, સમતા પાર્ટી પ્લોટ સામે, પેટલાદ રોડ, મુ. નડિયાદ",
      trustee_mobileNo: "મો. ૯૯૭૪૬ ૩૪૪૪૪",
    },
    {
      trustee_image: CL,
      trustee_title: "મેને. ટ્રસ્ટી",
      trustee_name: "ચંદ્રવદન લક્ષ્મીચંદ મિસ્ત્રી",
      trustee_description:
        "વિરેન ટ્રેડર્સ, પી.કે.બીઝનેસ સેન્ટર, વિશ્વકર્મા મંદિર સામે, ડાઈવે રોડ, ડીસા-૩૮૫૫૩૫, જી. બનાસકાંઠા",
      trustee_mobileNo: "મો. ૯૮૨૪૦ ૪૭૫૩૫",
    },
    {
      trustee_image: RAMANBHAI_PANCHAL,
      trustee_title: "મેને. ટ્રસ્ટી",
      trustee_name: "રમણભાઈ સોમાભાઈ પંચાલ",
      trustee_description:
        "૫૬, ન્યુ વિદ્યાવિહાર સોસાયટી, રામજી મંદિર રોડ, રાણીપ, અમદાવાદ.",
      trustee_mobileNo: "મો. ૯૪૨૭૨ ૧૯૦૯૪",
    },
    {
      trustee_image: DIPAKBHAI,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "દીપકભાઈ ભાનુભાઈ મિસ્ત્રી",
      trustee_description:
        "૪, શિવપાર્ક, રાજપાર્કની પાછળ, ગોપી અક્ષર ફાર્મ રોડ, મુ.આણંદ",
      trustee_mobileNo: "મો. ૭૩૮૩૮ ૧૪૩૬૮",
    },
    {
      trustee_image: PRADIPBHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "પ્રદીપભાઈ ભાઈલાલભાઈ સુથાર",
      trustee_description: "મોટા ફળિયું. સંતરામ મંદિર પાસે, મુ.ઉમરેઠ, જી. આણંદ",
      trustee_mobileNo: "મો. ૯૪૨૭૦ ક૨૮૩૬",
    },
    {
      trustee_image: NARESHKUMAR_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "નરેશકુમાર કનુભાઈ સુથાર",
      trustee_description:
        "ર, શિવમ સોસાયટી, વિભાગ-૨, ગાયત્રી સોસાયટી પાસે, મુ. બાજવા, જી. વડોદરા",
      trustee_mobileNo: "મો. ૯૯૭૪૭ ૦૪૧૧ર",
    },
    {
      trustee_image: HITEN_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "હિતેનભાઈ રમશેભાઈ ગજ્જર",
      trustee_description:
        "જલા પૂજન બંગ્લોઝ, એ-પ, અક્ષર ફાર્મ રોડ, આણંદ-વિદ્યાનગર રોડ, મુ. આણંદ",
      trustee_mobileNo: "મો. ૯૮ર૪૦ પ૭૯૦૮",
    },
    {
      trustee_image: BALMUKUNDBHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "બાલમુકુન્દ અંબાલાલ સુથાર",
      trustee_description:
        "ફુવારા ચોક પાસે, ડુંગરાભીત રોડ, મુ. લુણાવાડા, જી. મહીસાગર",
      trustee_mobileNo: "મો. ૯૮૨૫૪ ૯૨૫૪૮",
    },
    {
      trustee_image: CHIRAG,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "ચિરાગ દિલીપભાઈ સુથાર",
      trustee_description:
        "સુથાર વાળો, પોસ્ટ ઓફિસ પાસે, મુ. કાલસર, તા. ઠાસરા, જી. ખેડા",
      trustee_mobileNo: "મો. ૯૪૦૯૫ ૨૧૧૩૪",
    },
    {
      trustee_image: SURESHBHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "સુરેશભાઈ મોડનભાઈ સુથાર",
      trustee_description:
        "યમુનાકુંજ સાસોયટી, રામજી મંદિર સામે, મુ. ડાકોર, જી. ખેડા",
      trustee_mobileNo: "મો. ૯૮૨૫૮ ૬૧૨૬૦",
    },
    {
      trustee_image: BHADRESHBHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "ભદ્રેશકુમાર રમણભાઈ સુથાર",
      trustee_description:
        "૭, શિવમ પાર્ક સોસાયટી, ડબગર વાડીની પાછળ, મુ.ડાકોર, જી. ખેડા",
      trustee_mobileNo: "મો. ૯૪૨૬૩ ૭૩૦૮૫",
    },
    {
      trustee_image: RAJNIKANTBHAI,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "રજનીભાઈ ત્રિકમભાઈ સુથાર",
      trustee_description:
        "એસ-૪, સંગાથ એપાર્ટમેન્ટ, આર.એસ.એસ ઓફિસની સામે, ઢોર બજાર ચાર રસ્તા, કાંકરિયા, અમદાવાદ.",
      trustee_mobileNo: "મો. ૯૪૨૮૬ ૦૬૬૦૬",
    },
    {
      trustee_image: JAGDISHBHAI,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "જગદીશભાઈ જશભાઈ ગજ્જર",
      trustee_description:
        "૪૦૨, અભિષેક ફ્લેટ, ગોકુલવાડી, જૂની સિવિલ કોર્ટ પાછળ, મુ. આણંદ",
      trustee_mobileNo: "મો. ૯૭૨૩૮ ૧૩૦૮૬",
    },
    {
      trustee_image: ASHVINBHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "અશ્વિનભાઈ લાલભાઈ ગજ્જર",
      trustee_description:
        "૧૨, સર્વોદય સોસાયટી, વિભાગ-૧, મુ. સાણંદ, જી. અમદાવાદ",
      trustee_mobileNo: "મો. ૯૮૨૪૪ ૨૪૪૪૭",
    },
    {
      trustee_image: JYOTINDRABHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "જ્યોતિન્દ્ર પ્રમોદરાય ગજ્જર",
      trustee_description:
        "એ-૯, નિમિયા એપાર્ટમેન્ટ, ડીરાબાગ રેલ્વે ક્રોસિંગ, એલીસબ્રીજ, અમદાવાદ",
      trustee_mobileNo: "મો. ૯૯૭૯૮ ૬૭૪૬૯",
    },
    {
      trustee_image: HASMUKHBHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "હસમુખભાઈ અંબાલાલ પંચાલ",
      trustee_description:
        "૧૮, રૂપકમલ સોસાયટી, અન્નપૂર્ણા વાડીની બાજુમાં, ગાયત્રી મંદિર રોડ, રાણીપ, અમદાવાદ",
      trustee_mobileNo: "મો. ૯૮૯૮૦ ૩૪૫૧૪",
    },
    {
      trustee_image: RAMESHBHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "રમેશભાઈ ખેમચંદભાઈ પંચાલ",
      trustee_description:
        "કી-૧૦૪, સહજાનંદ એલીસગંજ, જે.વી. આઈ.ટી.આઈ. કોલેજ સામે, તારાપુર રોડ, કરમસદ, જી. આણંદ.",
      trustee_mobileNo: "મો. ૯૩૭૭૪ ૩૯૭૧૫",
    },
    {
      trustee_image: SARADBHAI,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "શરદભાઈ ડાહ્યાભાઈ સુથાર",
      trustee_description:
        "યતકૃપા રેસીડેન્સી, બંસરી પાવન ફફ્લેટ સામે, મુ. આણંદ",
      trustee_mobileNo: "મો. ૯૯૭૮૫ પર૪૯૭",
    },
    {
      trustee_image: Arvindbhai,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "અરવિંદભાઈ ઈશ્વરભાઈ સુથાર",
      trustee_description: "વાટામાં, પીપલવાળું ફળિયું, મુ. ઉમરેઠ, જી. આણંદ",
      trustee_mobileNo: "મો. ૯૪૨૬૫ ૬૦૯૬૦",
    },
    {
      trustee_image: RAMESHBHAI_GAJJAR,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "રમેશભાઈ હીરજીભાઈ ગજ્જર",
      trustee_description: "બેંક ઓફ બરોડા સામે, મુ. ધનસુરા, જી. અરવલ્લી",
      trustee_mobileNo: "મો. ૯૯૭૯૯ ૭૧૩૦૦",
    },
    {
      trustee_image: GANPATBHAI,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "ગણપતભાઈ અમથારામ પંચાલ",
      trustee_description:
        "૯, શુકન પેલેસ બંગ્લોઝ, વિ.-૧, હેતાર્થ પાર્ટી પ્લોટ પાસે, સાયન્સ સીટી રોડ, સોલા, અમદાવાદ",
      trustee_mobileNo: "મો. ૯૩૭૬૧ ૮૩૧૬૦",
    },
    {
      trustee_image: HIMMATBHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "હિંમતલાલ બાબુભાઈ પંચાલ",
      trustee_description:
        "૮, વિશ્વાસ બંગ્લોઝ, આર.સી.ટેકનિકલ રોડ, ચાંદલોડિયા, અમદાવાદ",
      trustee_mobileNo: "મો. ૯૩૭૬૧ ૧૭૯૧પ",
    },
    {
      trustee_image: MANOJBHAI_PHOTO,
      trustee_title: "ટ્રસ્ટીશ્રી",
      trustee_name: "મનોજભાઈ ઠાકોરભાઈ ખરાદી",
      trustee_description:
        "વિશ્વકર્મા મંદિર પાસે, સુથારવગા, મુ. સંખેડા, જી.છોટા ઉદેપુર",
      trustee_mobileNo: "મો. ૯૪૨૭૩ ૪૩૭૭૩",
    },
  ];

  useEffect(() => {
    const fetchTrustees = async () => {
      try {
        const response = await fetch(`${apiConfig.Base_Url}ap/trustees/cli`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTrustees(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setTrustees(staticTrustees); // Use static data if there's an error
        setError(true);
        setLoading(false);
      }
    };
    fetchTrustees();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="text-amber-400 animate-spin">
          <ImSpinner9 className="h-12 w-12" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative mb-4 overflow-hidden">
        <img
          src={dakor}
          alt="background image"
          className="w-full h-24 object-cover rounded-xl filter blur-sm"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">ટ્રસ્ટી મંડળ</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
      <div className="bg-purple-400 font-bold text-white text-center p-1 mt-2 mb-2 shadow-md">
        તા. 03-08-2022 ના રોજ જનરલ સભામાં નિયુક્ત થયેલ વ્યવસ્થાપક કમિટીના
        હોદેદારો તથા ટ્રસ્ટ સભ્યો
      </div>
      <div className="p-4 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {trustees.map((trustee, index) => (
            <Card className="w-80" key={index}>
              <CardHeader floated={false} className="h-64 z-20">
                <img
                  src={trustee.trustee_image}
                  alt="profile-picture"
                  className="w-full h-full object-fit"
                />
                <div className="bg-red-300 h-6 w-5 z-30"></div>
              </CardHeader>
              <CardBody className="text-center rounded-md p-2 m-3">
                <Typography variant="h4" color="red" className="mb-2">
                  {trustee.trustee_title}
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {trustee.trustee_name}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-bold text-blue-500"
                  textGradient
                >
                  {trustee.trustee_description}
                </Typography>
                <Typography className="font-bold text-black" textGradient>
                  <br />
                  {trustee.trustee_mobileNo}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trustees;
