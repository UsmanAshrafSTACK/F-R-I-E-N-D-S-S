<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
<DrawerHeader />
<UserInformation />
<PostForm/>

<div className="container">
  {/* {friendsDiv && (
    <>
      {allUsers.map((e, index) => (
        <CardHeader
          key={index}
          src={e.userPhoto}
          name={e.firstName + " " + e.lastName}
        />
      ))}
    </>
  )}

  {mainPage && <div className="allPost">
  {post.map((e, index) => (
    <Card sx={{ maxWidth: 345 }} key={index}>
      <CardHeader
        name={userInfo.firstName + " " + userInfo.lastName}
        time={e.dateString + " " + e.timeString}
        src={userInfo.userPhoto}
      />
      {e.postPicture !== "false" && <CardMain src={e.postPicture} />}
      <CardFooter caption={e.postCaption} />
    </Card>
  ))}
</div>} */}
</div>

<Profile/>
</Box>