import { dbPtfi } from "@/utils/database";

export const getDocumentData = async (
  type: 'spbb' | 'work-order'
) => {
  const docNeeded = type === 'spbb' ? 'BRCN-O' : 'DOGS-O'

  const result = await dbPtfi.query(`
    select
      distinct cast(Creation_Date as date) as 'distinct_date',
      (
        select
          count(*)
        from
          tbl_documents
        where
          cast(Creation_Date as date) = distinct_date
          and Status_Supporting_Document != 'Completed'
      ) as 'outstanding',
      (
        select
          count(*)
        from
          tbl_documents
        where
          cast(Creation_Date as date) = distinct_date
            and Status_Supporting_Document = 'Completed'
      ) as 'completed'
    from
      tbl_documents
    where
      Document_Needed = ?
    group by
      distinct_date
    order by 
      distinct_date
  `, [docNeeded]);

  return result;
};
