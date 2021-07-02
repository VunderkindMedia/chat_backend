const userFinder = (user, partnersList) => {
  let findUserOnTarget = partnersList.filter((partner) => {
    partner.anketa.target === user.target
  })

  let findUserOnSex = findUserOnTarget.filter((partner) => {
    if (user.anketa.member_sex === 0) {
      if (partner.anketa.member_sex === 0) {
        return true;
      } else if (partner.anketa.member_sex === user.me_sex) {
        return true;
      }
    } else {
      if (partner.anketa.member_sex === 0) {
        if (user.member_sex === partner.anketa.me_sex) {
          return true;
        }
      } else if (partner.anketa.member_sex === user.me_sex && user.member_sex === partner.anketa.me_sex) {
        return true;
      }
    }
  })

  let findUserOnAge = findUserOnSex.find((partner)=> {
    if ((user.me_age === null && partner.anketa.member_age.length === 0) && (partner.anketa.me_age === null && user.member_age.length === 0)) {
      return true
    } else if (user.member_age.length > 0) {
      if (user.member_age.include(partner.anketa.me_age)) {
        if (partner.anketa.member_sex.length > 0) {
          if (partner.anketa.member_age.include(user.me_age)) {
            return true
          }
        } else {
          return true
        }
      }
    }
  })
}

module.exports = userFinder();
