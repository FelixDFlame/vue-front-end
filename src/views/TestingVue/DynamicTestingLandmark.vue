<template>
  <section>
    <h2>{{ this.landmark.name }}</h2>
    <div class="my-details">
      <img :src="this.landmark.image" />
      <p>{{ this.landmark.detail }}</p>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      // jelek jika kita pakai $route bukan best practice
      // best practice gunakan props sebagai pass datanya
      // userId: this.$route.params.idUser
      allDestinations: [
        {
          id: 101,
          name: "Medan",
          image:
            "https://cdn-image.bisnis.com/posts/2017/04/06/643290/airyroom.jpg",
          detail:
            "Medan berawal dari sebuah kampung yang didirikan oleh Guru Patimpus di pertemuan Sungai Deli dan Sungai Babura. Hari jadi Kota Medan ditetapkan pada tanggal 1 Juli 1590. Selanjutnya pada tahun 1632, Medan dijadikan pusat pemerintahan Kesultanan Deli, sebuah kerajaan Melayu. Bangsa Eropa mulai menemukan Medan sejak kedatangan John Anderson dari Inggris pada tahun 1823. Peradaban di Medan terus berkembang hingga Pemerintah Hindia Belanda memberikan status kota dan menjadikannya pusat pemerintahan Karesidenan Sumatra Timur. Memasuki abad ke-20, Medan menjadi kota yang penting di luar Jawa, terutama setelah pemerintah kolonial membuka perusahaan perkebunan secara besar-besaran.",
          landmarks: [
            {
              name: "Istana Maimun",
              detail:
                "Istana Maimun merupakan bangunan bersejarah dengan arsitektur unik dan menawan.\n" +
                "Dengan memadukan gaya arsitektur Melayu, Islam, Timur Tengah, Spanyol, Italia, dan India, Istana Maimun menjadi lambang kejayaan Kerajaan Deli di Sumatera Utara.\n",
              image:
                "https://www.pegipegi.com/travel/wp-content/uploads/2018/10/istana-maimun.jpg"
            },
            {
              name: "Danau Siombak",
              detail:
                "Danau buatan yang memiliki luas hingga mencapai 40 hektare ini berada diantara Sungai Deli dan Sungai Terjun.",
              image:
                "https://nyero.id/wp-content/uploads/2017/10/Wisata-Hits-Danau-Siombak-Medan.png"
            },
            {
              name: "Museum Sumatera Utara",
              detail:
                "ada sekitar 6.799 koleksi yang disimpan di museum ini, yaitu terdiri dari satwa khas Sumatera, arca peninggalan Hindu – Budha, diorama kehidupan pra sejarah, dan peninggalan sejarah lainnya yang berharga.",
              image:
                "https://nyero.id/wp-content/uploads/2017/10/Wisata-Museum-Sumatera-Utara-Medan.png"
            }
          ]
        },
        {
          id: 104,
          name: "Jakarta",
          image:
            "https://img.inews.id/media/822/files/inews_new/2018/06/22/jakarta.jpg",
          detail:
            "Jakarta memiliki luas sekitar 661,52 km² (lautan: 6.977,5 km²), dengan penduduk berjumlah 10.374.235 jiwa (2017).[3] Wilayah metropolitan Jakarta (Jabodetabek) yang berpenduduk sekitar 28 juta jiwa,[5] merupakan metropolitan terbesar di Asia Tenggara atau urutan kedua di dunia.",
          landmarks: [
            {
              name: "Monas",
              detail: "Monas adalah bla bla....",
              image:
                "https://awsimages.detik.net.id/community/media/visual/2018/01/12/3aa462ea-df65-47fb-ac39-900912c03fbe_43.jpeg?w=700&q=90"
            }
          ]
        }
      ]
    };
  },
  props: {
    destinationName: {
      type: String,
      required: true
    },
    landmarkName: {
      type: String,
      required: true
    }
  },
  computed: {
    destination() {
      let destinationResult = this.allDestinations.find(
        des => des.name === this.destinationName
      );
      console.log(destinationResult);
      if (!destinationResult) {
        this.$router.push("/404");
      }
      return destinationResult;
    },
    landmark() {
      let landmarkResult = this.destination.landmarks.find(
        land => land.name === this.landmarkName
      );
      if (!landmarkResult) {
        this.$router.push("/404");
      }
      return landmarkResult;
    }
  }
};
</script>
<style scoped>
</style>