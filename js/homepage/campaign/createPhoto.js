const createPhotos = (data, photoLists) => {
  data.reduce((pre, item) => {
    const { picture, story } = item;
    storyLists = story.split("\n");
    let storyBlock = (
      `<div class="slide-text">
        <p class="slide-text-1">
          ${storyLists[0]}<br/>
          ${storyLists[1]}<br/>
          ${storyLists[2]}<br/>
        </p>
        <p class="slide-text-2">
          ${storyLists[3]}<br/>
        </p>
      </div>`);
    photoLists.push(
      `<div class="slide-photo z-${pre}" style="background-image: url(${picture})">
        ${storyBlock}
      </div>`
    );
    return ++pre;
  }, 1);
};