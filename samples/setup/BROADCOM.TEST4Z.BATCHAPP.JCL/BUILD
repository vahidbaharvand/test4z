$$JOBCARD
//*****************************************************************//
//* This job compiles and link-edits and the TEST4Z sample COBOL   *//
//* program.                                                       *//
//*                                                                *//
//* Follow these steps:                                            *//
//* 1) Set your high-level qualifier of your TEST4Z installation   *//
//*    in the HLQ SET field.                                       *//
//* 2) Edit the job card to your specifications.                   *//
//*                                                                *//
//******************************************************************//
//*====================================================================
//*   COBOL COMPILE
//*====================================================================
//HLQ     SET HLQ=$$HLQ
//COBOL   EXEC PGM=IGYCRCTL,REGION=0M,COND=(4,LT),
// PARM='LIST,MAP,APOST,LIB,NOSEQ,DYN'
//SYSLIB   DD   DSN=&HLQ..TEST4Z.BATCHAPP.COPY(CUSTREC),DISP=SHR
//STEPLIB  DD   DSN=IGY.SIGYCOMP,DISP=SHR
//SYSIN    DD   DSN=&HLQ..TEST4Z.BATCHAPP.PGM(CUSTSEQ),DISP=SHR
//SYSLIN   DD   DSN=&&OBJCOB,DISP=(NEW,PASS),
//             UNIT=SYSDA,SPACE=(TRK,(60,40)),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=3120)
//SYSPRINT DD   SYSOUT=*
//SYSUT1   DD   UNIT=VIO,SPACE=(CYL,(4),,CONTIG)
//SYSUT2   DD   UNIT=VIO,SPACE=(CYL,(4),,CONTIG)
//SYSUT3   DD   UNIT=VIO,SPACE=(CYL,(4),,CONTIG)
//SYSUT4   DD   UNIT=VIO,SPACE=(CYL,(4),,CONTIG)
//SYSUT5   DD   UNIT=VIO,SPACE=(CYL,(4),,CONTIG)
//SYSUT6   DD   UNIT=VIO,SPACE=(CYL,(4),,CONTIG)
//SYSUT7   DD   UNIT=VIO,SPACE=(CYL,(4),,CONTIG)
//SYSUT8   DD   UNIT=VIO,SPACE=(CYL,(5,3))
//SYSUT9   DD   UNIT=VIO,SPACE=(CYL,(5,3))
//SYSUT10  DD   UNIT=VIO,SPACE=(CYL,(5,3))
//SYSUT11  DD   UNIT=VIO,SPACE=(CYL,(5,3))
//SYSUT12  DD   UNIT=VIO,SPACE=(CYL,(5,3))
//SYSUT13  DD   UNIT=VIO,SPACE=(CYL,(5,3))
//SYSUT14  DD   UNIT=VIO,SPACE=(CYL,(5,3))
//SYSUT15  DD   UNIT=VIO,SPACE=(CYL,(5,3))
//SYSUDUMP DD   SYSOUT=*
//SYSPUNCH DD   SYSOUT=*
//SYSMDECK DD   UNIT=SYSALLDA
/*
//* ------------------------------------------------------------------
//*                       LINK-EDIT                      -------------
//* ------------------------------------------------------------------
//LINK    EXEC PGM=IEWL,REGION=1024K,COND=(4,LT),
// PARM='LET,LIST,MAP,XREF'
//SYSLIB   DD DISP=SHR,DSN=CEE.SCEELKED
//         DD DISP=SHR,DSN=CEE.SCEELKEX
//SYSPRINT DD   SYSOUT=*
//SYSUT1   DD   DSN=&&SYSUT1,UNIT=SYSDA,SPACE=(CYL,(5,1))
//SYSLMOD  DD   DISP=SHR,DSN=&HLQ..TEST4Z.BATCHAPP.LOADLIB
//SYSLIN   DD   DSN=&&OBJCOB,DISP=(OLD,DELETE)
//         DD   *
 MODE  AMODE(31),RMODE(ANY)
 ENTRY CUSTSEQ
 NAME  CUSTSEQ(R)
/*