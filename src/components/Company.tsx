import React from 'react';

import { MdOutlinePrivateConnectivity } from 'react-icons/md';


const CompanyContainer: React.FC<{
    company: any, showDetail: any, index: number
}> = ({ company, showDetail, index }) => {


    //console.log(" last account type : " + accounType)
    let styleError = (company.code_confidentialite === "0" ? " bg-danger" : " bg-primary") + " p-2 rounded";
    //console.log("style err : " + styleError);

    let colLeft = (
        <div className="col-6 ">
            <p className="mb-1">Siren : {company.siren}</p>
            <p className="mb-1">Adresse : {company.adresse}</p>
            <p className="mb-1">Date de dépot : {company.date_depot}</p>
            <p className="mb-1">Date de cloture exercice : {company.date_cloture_exercice}</p>
            <p className="mb-1">Dénomination : {company.denomination}</p>
        </div>);

    let colRight = (
        <div className="col-6 ">
            type de compte inconnu
        </div>
    );

    let accountType = company.code_type_bilan;

    switch (accountType) {

        case "C":

            colRight = (
                <div className="col-6 ">
                    <p className={"mb-1" + (company.FJ ? "" : styleError)}>Chiffre d'affaire : {company.FJ ? company.FJ[3] : "Undefine"}</p>
                    <p className={"mb-1" + (company.GG ? "" : styleError)}>Résultat d'exploitation : {company.GG ? company.GG[3] : "Undefine"}</p>
                    {/* <p className="mb-1">Bénéfice ou perte : {company.HN ? company.HN[1]:"Undefine"}</p> */}
                    {/* <p className={"mb-1" + (company.HN ? "" : styleError)}>Bénéfice ou perte : {company.HN ? company.HN[1] : "Undefine"}</p> */}
                    <p className={"mb-1" + (company.HN ? "" : styleError)}>Bénéfice ou perte : {company.HN ? company.HN[1] : "Undefine"}</p>

                    {/* <p className={"mb-1" + (company.CO ? "" : styleError)}>Total actif : {company.CO ? company.CO[3] : "Undefine"}</p> */}
                    <p className={"mb-1" + (company.CO ? "" : styleError)}>Total actif : {company.CO ? company.CO[3] : "Undefine"}</p>

                    {/* <p className={"mb-1" + (company['DI']? "" : styleError)}>Résultat Net : {company['DI']? company['DI[']1] : "Undefine"}</p> */}
                    <p className={"mb-1" + (company.DL ? "" : styleError)}>Capitaux Propres : {company.DL ? company.DL[1] : "Undefine"}</p>
                </div>
            )
            break;
        case "S":
            /* we can update colLeft */
            colRight = (
                <div className="col-6 ">
                    <p className={"mb-1" + (company['232'] ? "" : styleError)}>Total des produits d’exploitation hors T.V.A : {company['232'] ? company['232'][1] : "Undefine"}</p>
                    <p className={"mb-1" + (company['270'] ? "" : styleError)}>Résultat d'exploitation : {company['270'] ? company['270'][1] : "Undefine"}</p>
                    {/* <p className="mb-1">Bénéfice ou perte : {company..HN ? company..HN[1]:"Undefine"}</p> */}
                    <p className={"mb-1" + (company['310'] ? "" : styleError)}>Bénéfice ou perte : {company['310'] ? company['310'][1] : "Undefine"}</p>
                    <p className={"mb-1" + (company['110'] ? "" : styleError)}>Total actif : {company['110'] ? company['110'][3] : "Undefine"}</p>
                    <p className={"mb-1" + (company['142'] ? "" : styleError)}>Capitaux propres : {company['142'] ? company['142'][3] : "Undefine"}</p>
                </div>)
            break;
        case "K":
            /* we can update colLeft */
            colRight = (
                <div className="col-6 ">
                    <p className={"mb-1" + (company.FJ ? "" : styleError)}>Chiffre d'affaire : {company.FJ ? company.FJ[3] : "Undefine"}</p>
                    <p className={"mb-1" + (company.GG ? "" : styleError)}>Résultat d'exploitation : {company.GG ? company.GG[3] : "Undefine"}</p>
                    <p className={"mb-1" + (company.R6 ? "" : styleError)}>Resultat Net Consolidé : {company.R6 ? company.R6[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.CO ? "" : styleError)}>Total Actif Net: {company.CO ? company.CO[3] : "Undefine"}</p>

                    {/* <p className={"mb-1" + (company['DI']? "" : styleError)}>Résultat Net : {company['DI']? company['DI[']1] : "Undefine"}</p> */}
                    <p className={"mb-1" + (company.DL ? "" : styleError)}>Capitaux propres : {company.DL ? company.DL[1] : "Undefine"}</p>
                </div>)
            break;
        case "A":
            /* we can update colLeft */
            colRight = (
                <div className="col-6 ">
                    <p className={"mb-1" + (company.R1 ? "" : styleError)}>Primes - Cotisations acquises : {company.R1 ? company.R1[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.R2 ? "" : styleError)}>Charges des sinistres : {company.R2 ? company.R2[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.R4 ? "" : styleError)}>Résultat de l’exercice : {company.R4 ? company.R4[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.A2 ? "" : styleError)}>Total actif : {company.A2 ? company.A2[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.P3 ? "" : styleError)}>Total Passif : {company.P3 ? company.P3[1] : "Undefine"}</p>
                </div>)
            break;
        case "B":
            /* we can update colLeft */
            colRight = (
                <div className="col-6 ">
                    <p className={"mb-1" + (company.R1 ? "" : styleError)}>Intérêts et produits assimilés : {company.R1 ? company.R1[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.R2 ? "" : styleError)}>Intérêts et charges assimilées : {company.R2 ? company.R2[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.R3 ? "" : styleError)}>Résultat de l’exercice : {company.R3 ? company.R3[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.A2 ? "" : styleError)}>Créances sur la clientèle : {company.A2 ? company.A2[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.P2 ? "" : styleError)}>Comptes créditeurs à la clientèle : {company.P2 ? company.P2[1] : "Undefine"}</p>
                </div>)
            break;
        default:
            colRight = (
                <div className="col-6 ">
                    <p className={"mb-1" + (company.FJ ? "" : styleError)}>Chiffre d'affaire : {company.FJ ? company.FJ[3] : "Undefine"}</p>
                    <p className={"mb-1" + (company.GG ? "" : styleError)}>Résultat d'exploitation : {company.GG ? company.GG[3] : "Undefine"}</p>
                    {/* <p className="mb-1">Bénéfice ou perte : {company.HN ? company.HN[1]:"Undefine"}</p> */}
                    <p className={"mb-1" + (company.HN ? "" : styleError)}>Bénéfice ou perte : {company.HN ? company.HN[1] : "Undefine"}</p>
                    <p className={"mb-1" + (company.CO ? "" : styleError)}>Total actif : {company.CO ? company.CO[3] : "Undefine"}</p>
                    <p className={"mb-1" + (company['DI']? "" : styleError)}>Résultat Net : {company['DI']? company['DI'][1] : "Undefine"}</p>
                </div>
            )
            break;
    }

    // print 2 columns
    return (
        <div key={index + 'id' + company.siren + company.date_cloture_exercice + company.num_depot + company._id.timestamp + company._id.date} className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 overflow-hidden mt-3 pb-3">

            <div className="row">
                {colLeft}

                {colRight}

                {/** Voir les comptes confidentiels */}
                {/* <div className='text-center col-12 p-2 mt-2'>
                confidentiel : {company.code_confidentialite === "0" ? "NON" : "OUI"}
                {company.code_confidentialite !== "0" &&
                    <MdOutlinePrivateConnectivity size={40} />
                }
            </div> */}

                <div className="col-12 text-right ">
                    <button className="btn btn-primary " onClick={() => showDetail(company)}>Details</button>
                </div>
            </div>
   
        </div>
    );

}

export default CompanyContainer;