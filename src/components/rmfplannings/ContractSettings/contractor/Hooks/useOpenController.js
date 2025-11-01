import { useCallback, useState } from "react";

export default function useOpenController(initialState) {
  const [isOpen, setOpenState] = useState(initialState);
  const [isOpenrec, setOpenrecState] = useState(initialState);
  const [isOpenplan, setOpenplanState] = useState(initialState);
  const [isOpenapproval ,setOpenapproval]=useState(initialState);
  const [isOpenapprovalcontract ,setOpenapprovalcontract]=useState(initialState);
  const [isOpencont, setOpencontState] = useState(initialState);
  const [isOpenfiscalyear, setOpenfiscalyearState] = useState(initialState);
  const[isOpencontracttype,setOpencontracttypeState]= useState(initialState);
   const[isOpenproject,setOpenprojectState]= useState(initialState);
   const[isOpenlookup,setOpenlookupState]= useState(initialState);
   const[isOpensecurity,setOpensecurityState]= useState(initialState);
   const[isOpenlookcoll,setOpenlookcollState]= useState(initialState);
   const[isOpenlookplan,setOpenlookplanState]= useState(initialState);
   const[isOpenlookcontr,setOpenlookcontrState]= useState(initialState);
   const[isOpenapprovalinspection,setOpenapprovalinspection]= useState(initialState);
   
    
   const toggleapprovalinspection=useCallback(()=>{
    setOpenapprovalinspection((state)=>!state);
   },[setOpenapprovalinspection]);

   const toggleapprovalcontract=useCallback(()=>{
    setOpenapprovalcontract((state)=>!state);
   },[setOpenapprovalcontract]);

   const toggleapproval=useCallback(()=>{
    setOpenapproval((state)=>!state);
   },[setOpenapproval]);

    const togglelookcoll = useCallback(() => {
    setOpenlookcollState((state) => !state);
  }, [setOpenlookcollState]);

   const togglelookplan = useCallback(() => {
    setOpenlookplanState((state) => !state);
  }, [setOpenlookplanState]);

   const togglelookcontr = useCallback(() => {
    setOpenlookcontrState((state) => !state);
  }, [setOpenlookcontrState]);
  
 const togglesecurity = useCallback(() => {
    setOpensecurityState((state) => !state);
  }, [setOpensecurityState]);

   const togglelookup = useCallback(() => {
    setOpenlookupState((state) => !state);
  }, [setOpenlookupState]);
 
  const toggle = useCallback(() => {
    setOpenState((state) => !state);
  }, [setOpenState]);

  const togglerec = useCallback(() => {
    setOpenrecState((state) => !state);
  }, [setOpenrecState]);

  const toggleplan = useCallback(() => {
    setOpenplanState((state) => !state);
  }, [setOpenplanState]);
  const toggleCont = useCallback(() => {
    setOpencontState((state) => !state);
  }, [setOpencontState]);

  const togglecontracttype = useCallback(() => {
    setOpencontracttypeState((state) => !state);
  }, [setOpencontracttypeState]);

   const togglefiscalyear = useCallback(() => {
    setOpenfiscalyearState((state) => !state);
  }, [setOpenfiscalyearState]);

  const toggleproject = useCallback(() => {
    setOpenprojectState((state) => !state);
  }, [setOpenprojectState]);

  return { isOpen,isOpenrec,isOpenplan,isOpencont,isOpenfiscalyear,isOpencontracttype,isOpenproject,isOpenlookup,isOpensecurity,isOpenlookcoll,isOpenlookplan,isOpenlookcontr,isOpenapproval,isOpenapprovalcontract,isOpenapprovalinspection, toggleapprovalinspection, 
    toggleapprovalcontract,toggleapproval, toggle,togglerec,toggleplan,toggleCont,togglefiscalyear,togglecontracttype,toggleproject,togglelookup ,togglesecurity,togglelookcoll,togglelookplan,togglelookcontr};  
} 

