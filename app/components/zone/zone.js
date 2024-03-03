import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class ZoneZoneComponent extends Component {
    // diacritics = ['María', 'Søren Larsen', 'João', 'Saša Jurić', 'Íñigo'];
    // @tracked selected;
    // @tracked Country = ['Bangladesh','USA'];
    @tracked Country = ['Bangladesh'];

    @tracked districtsByDivision = {
        Dhaka: {
            Dhaka: ['Dhaka', 'Savar', 'Gazipur', 'Tongi', 'Narayanganj', 'Rupganj', 'Sonargaon', 'Bandar'],
            Gazipur: ['Gazipur Sadar', 'Kaliakair', 'Kapasia', 'Sreepur'],
            Narayanganj: ['Narayanganj Sadar', 'Sonargaon', 'Rupganj', 'Araihazar'],
            Narsingdi: ['Narsingdi Sadar', 'Belabo', 'Monohardi', 'Palash', 'Raipura', 'Shibpur'],
            Shariatpur: ['Shariatpur Sadar', 'Naria', 'Gosairhat', 'Bhedarganj', 'Damudya', 'Zanjira'],
            Tangail: ['Tangail Sadar', 'Ghatail', 'Gopalpur', 'Kalihati', 'Delduar', 'Mirzapur', 'Nagarpur', 'Sakhipur', 'Basail', 'Bhuapur'],
            Kishoreganj: ['Kishoreganj Sadar', 'Katiadi', 'Bhairab', 'Hossainpur', 'Austagram', 'Itna', 'Karimganj', 'Mithamain', 'Nikli', 'Pakundia', 'Tarail'],
            Manikganj: ['Manikganj Sadar', 'Singair', 'Shivalaya', 'Harirampur', 'Saturia', 'Ghior', 'Daulatpur'],
            Munshiganj: ['Munshiganj Sadar', 'Tongibari', 'Gazaria', 'Sirajdikhan', 'Lohajang', 'Sreenagar'],
            Rajbari: ['Rajbari Sadar', 'Baliakandi', 'Goalandaghat', 'Pangsha', 'Kalukhali'],
            Madaripur: ['Madaripur Sadar', 'Rajoir', 'Shibchar', 'Kalkini'],
            Gopalganj: ['Gopalganj Sadar', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'],
            Faridpur: ['Faridpur Sadar', 'Boalmari', 'Alfadanga', 'Madukhali', 'Bhanga', 'Charbhadrasan', 'Sadarpur', 'Nagarkanda']
        },
        Rajshahi: {
            Bogra: ['Bogra Sadar', 'Shibganj', 'Adamdighi', 'Sariakandi', 'Nandigram', 'Dhunat', 'Gabtali', 'Sherpur', 'Kahaloo', 'Dupchanchia'],
            Joypurhat: ['Joypurhat Sadar', 'Kalai', 'Khetlal', 'Panchbibi', 'Akkelpur'],
            Naogaon: ['Naogaon Sadar', 'Manda', 'Atrai', 'Patnitala', 'Dhamoirhat', 'Badalgachhi', 'Raninagar', 'Sapahar', 'Porsha'],
            Natore: ['Natore Sadar', 'Baraigram', 'Bagatipara', 'Lalpur', 'Naldanga', 'Singra', 'Gurudaspur'],
            Chapainawabganj: ['Chapainawabganj Sadar', 'Shibganj', 'Bholahat', 'Nachole', 'Gomastapur', 'Rohanpur'],
            Pabna: ['Pabna Sadar', 'Ishwardi', 'Atgharia', 'Bera', 'Sujanagar', 'Santhia', 'Faridpur', 'Chatmohar'],
            Rajshahi: ['Rajshahi Sadar', 'Paba', 'Bagha', 'Boalia', 'Tanore', 'Godagari', 'Puthia', 'Durgapur', 'Charghat'],
            Sirajganj: ['Sirajganj Sadar', 'Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur', 'Raiganj', 'Shahjadpur', 'Tarash', 'Ullapara']
        },
        Khulna: {
            Bagerhat: ["Bagerhat Sadar", "Mongla", "Rampal", "Morrelganj", "Fakirhat", "Kachua"],
            Chuadanga: ["Chuadanga Sadar", "Alamdanga", "Damurhuda"],
            Jessore: ["Jessore Sadar", "Manirampur", "Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Kotchandpur", "Maheshpur"],
            Jhenaidah: ["Jhenaidah Sadar", "Kotchandpur", "Kaliganj", "Maheshpur", "Shailkupa", "Harinakunda"],
            Khulna: ["Khulna Sadar", "Terokhada", "Daulatpur", "Paikgachha", "Phultala"],
            Kushtia: ["Kushtia Sadar", "Kumarkhali", "Khoksa"],
            Magura: ["Magura Sadar", "Mohammadpur", "Shalikha"],
            Meherpur: ["Meherpur Sadar", "Gangni", "Mujibnagar"],
            Narail: ["Narail Sadar", "Lohagara", "Kalia"],
            Satkhira: ["Satkhira Sadar", "Assasuni", "Debhata", "Tala", "Kalaroa"]
        },
        Barishal: {
            Barguna: ["Barguna Sadar", "Amtali", "Bamna", "Betagi", "Patharghata", "Taltali"],
            Barisal: ["Barisal Sadar", "Babuganj", "Agailjhara", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
            Bhola: ["Bhola Sadar", "Borhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
            Jhalokati: ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
            Patuakhali: ["Patuakhali Sadar", "Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar"],
            Pirojpur: ["Pirojpur Sadar", "Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad (Swasti)", "Pirojpur Sadar"]
        },
        Sylhet: {
            Habiganj: ["Habiganj Sadar", "Ajmiriganj", "Bahubal", "Baniachong", "Chunarughat", "Lakhai", "Madhabpur", "Nabiganj"],
            Moulvibazar: ["Moulvibazar Sadar", "Barlekha", "Juri", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal"],
            Sunamganj: ["Sunamganj Sadar", "Bishwambarpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jamalganj", "Sunamganj Sadar", "Tahirpur"],
            Sylhet: ["Sylhet Sadar", "Balaganj", "Beanibazar", "Bianibazar", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Zakiganj"]
        },
        Rangpur: {
            Dinajpur: ["Dinajpur Sadar", "Birganj", "Birampur", "Biral", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"],
            Gaibandha: ["Gaibandha Sadar", "Fulchhari", "Gobindaganj", "Palashbari", "Saghata", "Sadullapur", "Gobindaganj", "Sundarganj", "Shaghata", "Sughatta", "Sundargonj", "Sundorgonj", "Sundergonj"],
            Kurigram: ["Kurigram Sadar", "Bhurungamari", "Char Rajibpur", "Chilmari", "Kurigram Sadar", "Nageshwari", "Phulbari", "Rajarhat", "Ulipur"],
            Lalmonirhat: ["Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
            Nilphamari: ["Nilphamari Sadar", "Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
            Panchagarh: ["Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia", "Tetulia"],
            Rangpur: ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj"],
            Thakurgaon: ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"],
        },
        Chittagong: {
            Bandarban: ["Bandarban Sadar", "Thanchi", "Lama", "Ruma", "Rowangchhari", "Alikadam"],
            Brahmanbaria: ["Brahmanbaria Sadar", "Ashuganj", "Bancharampur", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"],
            Chandpur: ["Chandpur Sadar", "Haimchar", "Hajiganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
            Chittagong: ["Chittagong Sadar", "Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"],
            CoxsBazar: ["Cox's Bazar Sadar", "Chakaria", "Kutubdia", "Maheshkhali", "Ramu", "Teknaf", "Ukhia"],
            Feni: ["Feni Sadar", "Chhagalnaiya", "Daganbhuiyan", "Parshuram", "Fulgazi", "Sonagazi"],
            Khagrachhari: ["Khagrachhari Sadar", "Dighinala", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
            Lakshmipur: ["Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati", "Kamalnagar"],
            Noakhali: ["Noakhali Sadar", "Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Senbagh", "Subarnachar"],
            Rangamati: ["Rangamati Sadar", "Bagaichhari", "Barkal", "Kaptai", "Juraichhari", "Langadu", "Naniarchar", "Rajasthali"],
        },
        Mymensingh: {
            Jamalpur: ["Jamalpur Sadar", "Bakshiganj", "Dewanganj", "Islampur", "Madarganj", "Melandaha", "Sarishabari"],
            Mymensingh: ["Mymensingh Sadar", "Bhaluka", "Fulbaria", "Gafargaon", "Gouripur", "Haluaghat", "Isshwargonj", "Muktagachha", "Nandail", "Phulpur", "Trishal"],
            Netrokona: ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Madan", "Mohanganj", "Purbadhala"],
            Sherpur: ["Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sreebardi"],
        },
    };

    @tracked Divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"];
    @tracked Districts;
    @tracked Upazilas;

    // all defualt names.
    @tracked CoutryName = 'Country';
    @tracked DivisionName = 'Division';
    @tracked DistrictName = 'District';
    @tracked UpazilaName = 'Upazila';

    // true if disable (at first disable except country selected btn).
    @tracked DivisionBtn = true;
    @tracked DistrictBtn = true;
    @tracked UpazilaBtn = true;

    // zoneValue => bangldesh/dhaka/dhaka.
    @tracked Zonevalue;


    // country
    @action
    Handlecountry(Country) {
        this.CoutryName = Country;
        console.log(Country);
        // if country is selected make division btn enabled via false = enable.
        this.DivisionBtn = false;
        // zone value is the country value bangladesh right now //
        this.Zonevalue = Country;
        console.log(this.Zonevalue);
        // if i change division to bangladesh again or select bangladesh then make all the others dropdown name as default and btn disabled.
        // if (this.Zonevalue === 'Bangladesh') {
        //     this.DivisionName = 'Division';
        //     this.DistrictName = 'District';
        //     this.UpazilaName = 'Upazila';
        //     // make district, upazila disabled but division enabled as it is.
        //     this.DistrictBtn = true;
        //     this.UpazilaBtn = true;
        // }
    }


    // Division
    @action
    HandleDivision(Division) {
        // this.selected = Division;
        console.log(Division);
        // if district name is default not selected make upazila btn disabed.
        if (this.DistrictName === 'District') {
            this.UpazilaBtn = true;
        }
        // if division is changed make district to default value 'Districk' and upazila is disabled.
        if (Division != this.DivisionName) {
            this.DistrictName = 'District';
            this.UpazilaBtn = true;
        }
        this.DivisionName = Division;
        // if division is selected make district btn enabled via false means enalbe.
        this.DistrictBtn = false;
        // setting division name in the dropdown menu from the array of object.
        this.Districts = Object.keys(this.districtsByDivision[this.DivisionName]);
        // zone value remove all zone value add new value with the selected one //
        this.Zonevalue = '';
        this.Zonevalue = this.CoutryName + '/' + Division;
    }



    // District
    @action
    HandleDistrict(District) {
        // if district is changed make upazila default value.
        if (District != this.DistrictName) {
            this.UpazilaName = 'Upazila';
        }
        this.DistrictName = District;
        // if district is selected make upazila btn enabled via making it false.
        this.UpazilaBtn = false;
        // dropdown value
        this.Upazilas = Object.values(this.districtsByDivision[this.DivisionName][District]);
        // zone value //
        this.Zonevalue = '';
        this.Zonevalue = this.CoutryName + '/' + this.DivisionName + '/' + District;
    }


    // Upazila
    @action
    HandleUpazila(Upazila) {
        this.UpazilaName = Upazila;
        // zone value //
        this.Zonevalue = '';
        this.Zonevalue = this.CoutryName + '/' + this.DivisionName + '/' + this.DistrictName + '/' + Upazila;
    }
}


